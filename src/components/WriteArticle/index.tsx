import React, { useEffect, useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAvoidingView, Spinner, useToast } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { articleAPI } from '@/apis';
import { APItype } from '@/enums/image';
import { getTs } from '@/helpers/functions/time';
import { validateLink } from '@/helpers/functions/validate';
import { useToaster } from '@/helpers/hooks';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import { AppRoutes } from '@/helpers/routes';
import { AppThunk, RootState } from '@/store';
import {
  createSingleArticle,
  editSingleArticle,
  getSingleArticle,
} from '@/store/articleSlice';
import { palette } from '@/styles';
import { IPostArticle } from '@/types/article';
import { EditArticleParamList } from '@/types/navigation';
import { TShortImage } from '@/types/shared';

import AppLoadingTemplate from '../AppLoading';
import { GButton } from '../Gatgu';
import Header from '../Header';
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
interface IWriteArticleProps {
  isEdit: boolean; // true: edit 창, false: write 창
}

function WriteArticleTemplate({ isEdit }: IWriteArticleProps): JSX.Element {
  const [images, setImages] = useState<TShortImage[]>([]);
  const [need_price, setPrice] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EditArticleParamList, 'EditArticle'>>();
  const { id } = isEdit ? route.params : { id: 0 };
  const dispatch = useDispatch();
  const { uploadMultipleImages } = useImageUpload(APItype.article, id);
  const toaster = useToaster();
  // if edit, get article and send them to other subcomponents
  const currentArticle = useSelector((state: RootState) => {
    if (isEdit) return state.article.currentArticle;
    else return null;
  });

  const isLogined = useSelector((state: RootState) => state.user.isLogined);

  const [loading, setLoading] = useState<boolean>(false);

  const handlePrice = (inp: string) => {
    if (inp === 'NaN' || !parseInt(inp)) setPrice('');
    else setPrice(inp);
  };

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
      setDueDate(new Date());
      // optional:
      if (currentArticle.images.length > 0) {
        setImages(
          currentArticle.images.map((img) => {
            return { mime: 'uploaded', path: img.img_url };
          })
        );
      }
      /** ADD WHEN TAGS ARE USED
        if (currentArticle.tag) {
          const temp = currentArticle.tag.map((i, num) => {
            return { id: i, tag: `${num}`, selected: false };
          });
          toggleTags(temp);
        }
       */
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticle]);

  const checkInput = (): string => {
    if (!title.length) return '제목을 입력해주세요.\n';
    else if (!need_price.length) return '희망 구매액을 입력해주세요.\n';
    else if (!location.length) return '희망 거래 지역을 입력해주세요.\n';
    else if (!validateLink(link)) return '링크를 다시 한번 확인해주세요.\n';
    else if (!description.length) return '글의 세부사항을 입력해주세요.\n';
    else return '';
  };

  const finishSubmit = () => {
    setLoading(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setLink('');
    setLocation('');
    setImages([]);
    setDueDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  };

  const submit = () => {
    setLoading(true);
    if (!isLogined) {
      toaster.info('로그인을 해주세요');
      setLoading(false);
      /* TODO @juimdpp
        로그인 페이지로 redirect 되는 페이지 구현
        디자인 나오면...?
      */
      return;
    }
    const res = checkInput();
    if (res != '') {
      toaster.warning(res);
      setLoading(false);
      return;
    }
    const checkImages =
      images.length > 0
        ? uploadMultipleImages(images)
        : new Promise<string[]>((resolve) => resolve([]));
    checkImages
      .then((urls: any) => {
        const tempArticle = {
          title: title,
          description: description,
          trading_place: location,
          price_min: parseInt(need_price),
          time_in: getTs(dueDate),
          product_url: link,
        } as IPostArticle;
        if (urls.length > 0) tempArticle.img_urls = urls;
        if (isEdit && currentArticle) {
          const pr = dispatch(editSingleArticle(id, tempArticle));
          Promise.resolve(pr).then((newID: AppThunk) => {
            if (newID && newID.toString() != '-1') {
              setLoading(false);
              finishSubmit();
              navigation.navigate(AppRoutes.ArticleStack, {
                screen: AppRoutes.Article,
                params: {
                  id: newID,
                },
              });
            } else {
              setLoading(false);
              finishSubmit();
              console.log('ERROR');
              toaster.error('에러가 발생했습니다. 다시 시도해주세요');
            }
          });
        } else {
          const pr = dispatch(createSingleArticle(tempArticle));
          Promise.resolve(pr).then((newID: AppThunk) => {
            console.log('newID', newID);
            if (newID && newID.toString() != '-1') {
              setLoading(false);
              finishSubmit();
              navigation.navigate(AppRoutes.ArticleStack, {
                screen: AppRoutes.Article,
                params: {
                  id: newID,
                },
              });
            } else {
              setLoading(false);
              finishSubmit();
              console.log('ERROR');
              toaster.error('에러가 발생했습니다. 다시 시도해주세요');
            }
          });
        }
      })
      .catch((e) => {
        setLoading(false);
        finishSubmit();
        console.log('ERROR', e);
        toaster.error('에러가 발생했습니다. 다시 시도해주세요');
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          {isEdit ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 11 }}
            >
              <Icon name="chevron-back" size={38} />
            </TouchableOpacity>
          ) : null}
        </View>
      ),
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <GButton
          onPress={submit}
          width="default"
          size="small"
          isLoading={loading}
        >
          완료
        </GButton>
      ),
      headerTitle: '글쓰기',
    });
  }, [loading, submit]);

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
        height: '100%',
        opacity: loading ? 0.4 : 1,
      }}
    >
      <KeyboardAvoidingView>
        {/* <Tags tags={tags} toggleTags={toggleTags} /> */}
        <DueDate
          dueDate={dueDate}
          setDueDate={setDueDate}
          editable={!loading}
        />
        <AddImage images={images} setImages={setImages} editable={!loading} />
        <Title title={title} setTitle={setTitle} editable={!loading} />
        <Recruiting
          needPrice={need_price}
          setPrice={handlePrice}
          editable={!loading}
        />
        <Location
          location={location}
          setLocation={setLocation}
          editable={!loading}
        />
        <Link link={link} setLink={setLink} editable={!loading} />
        <Description
          description={description}
          setDescription={setDescription}
          editable={!loading}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default WriteArticleTemplate;
