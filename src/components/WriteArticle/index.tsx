import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAvoidingView } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

import tagNames from '@/constants/tagList';
import { APItype } from '@/enums/image';
import { createError } from '@/helpers/functions';
import { validateLink } from '@/helpers/functions/validate';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import { AppRoutes } from '@/helpers/routes';
import { RootState } from '@/store';
import {
  createSingleArticle,
  editSingleArticle,
  getSingleArticle,
} from '@/store/articleSlice';
import { IPostArticle, ITagType } from '@/types/article';
import { EditArticleParamList } from '@/types/navigation';
import { TShortImage } from '@/types/shared';

import AddImage from './AddImage/AddImage';
import Description from './Description/Description';
import DueDate from './DueDate/DueDate';
import Link from './Link/Link';
import Location from './Location/Location';
import Recruiting from './Recruiting/Recruiting';
import Title from './Title/Title';

/*TODO: @juimdpp
 when: 엄청 급한게 아니라 모든 코드 마스터로 머지 되고, 다시 수정할때..?
  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
 when: 기획 잡히면:
  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
*/
const [Error] = createError();
interface IWriteArticleProps {
  isEdit: boolean; // true: edit 창, false: write 창
}

const TagArray = tagNames.map((item, indx) => {
  return { id: indx, tag: item, selected: false };
});

function WriteArticleTemplate({ isEdit }: IWriteArticleProps): JSX.Element {
  const [images, setImages] = useState<TShortImage[]>([]);
  const [need_price, setPrice] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [, toggleTags] = useState<ITagType[]>(TagArray);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EditArticleParamList, 'EditArticle'>>();
  const { id } = isEdit ? route.params : { id: 0 };
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState<number>(-100);
  const [hasError, setErrorStatus] = useState<boolean>(false);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const { uploadMultipleImages } = useImageUpload(APItype.article, id);

  // if edit, get article and send them to other subcomponents
  const currentArticle = useSelector((state: RootState) => {
    if (isEdit) return state.article.currentArticle;
    else return null;
  });
  const _pageStatus = useSelector((state: RootState) => {
    return state.article.WriteArticleErrorStatus;
  });
  const _errorState = useSelector((state: RootState) => {
    return state.article.WriteArticleHasError;
  });
  const _loadingStatus = useSelector((state: RootState) => {
    return state.article.WriteArticleIsLoading;
  });

  const isUserLoggedIn = !!useSelector(
    (state: RootState) => state.user.accessToken
  );

  const handlePrice = (inp: string) => {
    if (inp === 'NaN') setPrice('');
    else setPrice(inp);
  };

  useEffect(() => {
    setPageStatus(_pageStatus);
    setErrorStatus(_errorState);
  }, [_pageStatus, _errorState]);

  useEffect(() => {
    setLoadingStatus(_loadingStatus);
  }, [_loadingStatus]);

  useEffect(() => {
    if (isEdit) dispatch(getSingleArticle(id));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit && currentArticle) {
      setTitle(currentArticle.title);
      setDescription(currentArticle.description);
      setLocation(currentArticle.trading_place);
      setLink(currentArticle.product_url);
      handlePrice(`${currentArticle.price_min}`);
      setDueDate(new Date()); // FIXME:
      // optional:
      currentArticle.images[0] && setImages(images);
      if (currentArticle.tag) {
        const temp = currentArticle.tag.map((i, num) => {
          return { id: i, tag: `${num}`, selected: false };
        });
        toggleTags(temp);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticle]);

  const checkInput = (): string => {
    let str = '';
    if (!validateLink(link)) str += 'Link is invalid.\n';
    return str;
  };

  const submit = () => {
    if (!isUserLoggedIn) {
      Alert.alert('로그인을 해주세요');
      /* TODO @juimdpp
        로그인 페이지로 redirect 되는 페이지 구현
        디자인 나오면...?
      */
      return;
    }
    const res = checkInput();
    if (res != '') {
      Alert.alert(res);
      return;
    }
    const checkImages =
      images.length > 0
        ? uploadMultipleImages(images)
        : new Promise<string[]>((resolve) => resolve([]));

    checkImages
      .then((urls) => {
        const tempArticle = {
          title: title,
          description: description,
          trading_place: location,
          price_min: parseInt(need_price),
          time_in: dueDate.getTime(),
          product_url: link,
        } as IPostArticle;
        if (urls.length > 0) tempArticle.images = urls;
        if (isEdit && currentArticle) {
          const pr = dispatch(editSingleArticle(id, tempArticle));
          Promise.resolve(pr).then(() => {
            navigation.navigate(AppRoutes.ArticleStack, {
              screen: AppRoutes.Article,
              params: {
                id: id,
              },
            });
          });
        } else {
          const pr = dispatch(createSingleArticle(tempArticle));
          Promise.resolve(pr).then((newID) => {
            navigation.navigate(AppRoutes.ArticleStack, {
              screen: AppRoutes.Article,
              params: {
                id: newID,
              },
            });
          });
        }
      })
      .catch((e) => {
        console.log('ERROR', e);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => <Button title="완료" onPress={submit} />,
    });
  });

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {hasError ? (
        Error(pageStatus, () => {
          Alert.alert('Need to fix this part');
        })
      ) : isLoading ? (
        <Text>Loading Page</Text>
      ) : (
        <KeyboardAvoidingView>
          {/* <Tags tags={tags} toggleTags={toggleTags} /> */}
          <DueDate dueDate={dueDate} setDueDate={setDueDate} />
          <AddImage images={images} setImages={setImages} />
          <Title title={title} setTitle={setTitle} />
          <Recruiting needPrice={need_price} setPrice={handlePrice} />
          <Location location={location} setLocation={setLocation} />
          <Link link={link} setLink={setLink} />
          <Description
            description={description}
            setDescription={setDescription}
          />
        </KeyboardAvoidingView>
      )}
    </ScrollView>
  );
}

export default WriteArticleTemplate;
