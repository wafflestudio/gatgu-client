import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosResponse } from 'axios';
import { KeyboardAvoidingView } from 'native-base';

import { StackActions, useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { articleAPI } from '@/apis';
import { RESET_SCREEN } from '@/constants/navigateOption';
import { APItype } from '@/enums/image';
import { getTs } from '@/helpers/functions/time';
import { validateLink } from '@/helpers/functions/validate';
import { useToaster } from '@/helpers/hooks';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import { AppRoutes } from '@/helpers/routes';
import { EArticleStackScreens } from '@/screens/ArticleStack/ArticleStack';
import { EHomeStackScreens } from '@/screens/HomeStack/HomeStack';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';
import { IPostArticle } from '@/types/article';
import { EditArticleParamList } from '@/types/navigation';
import { TShortImage } from '@/types/shared';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toaster = useToaster();

  const route = useRoute<RouteProp<EditArticleParamList, 'EditArticle'>>();
  const { id } = isEdit ? route.params : { id: 0 };

  const { uploadMultipleImages } = useImageUpload(APItype.article, id);

  // if edit, get article and send them to other subcomponents
  const currentArticle = useSelector((state: RootState) => {
    if (isEdit) return state.article.currentArticle;
    else return null;
  });

  const [images, setImages] = useState<TShortImage[]>([]);
  const [need_price, setPrice] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrice = (inp: number | null) => {
    setPrice(inp);
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
      handlePrice(currentArticle.price_min);
      setDueDate(new Date(currentArticle.time_in));
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

  const checkInput = React.useCallback((): string => {
    if (!title.length) return '제목을 입력해주세요.';
    else if (need_price === null) return '희망 구매액을 입력해주세요.';
    else if (!location.length) return '희망 거래 지역을 입력해주세요.';
    else if (!validateLink(link)) return '링크를 다시 한번 확인해주세요.';
    else if (!description.length) return '글의 세부사항을 입력해주세요.';
    else return '';
  }, [title, need_price, location, description, link]);

  const finishSubmit = React.useCallback(() => {
    setLoading(false);
    setTitle('');
    setDescription('');
    setPrice(null);
    setLink('');
    setLocation('');
    setImages([]);
    setDueDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  }, []);

  const navigateToArticle = React.useCallback(
    (articleId?: number) => {
      if (!articleId) return;

      navigation.dispatch(
        StackActions.replace('MainStack', {
          screen: 'Home',
          params: {
            screen: EHomeStackScreens.ArticleStack,
            params: {
              screen: 'Article',
              params: { id: articleId, navigateFlag: RESET_SCREEN },
            },
          },
        })
      );
    },
    [navigation]
  );

  const submit = React.useCallback(async () => {
    //
    // check input valid and get error message
    //
    const errorMsg = checkInput();
    if (errorMsg != '') {
      toaster.warning(errorMsg);
      return;
    }

    setLoading(true);

    try {
      //
      // get uploaded url images
      //
      const getImageUrls = () =>
        images.length > 0 ? uploadMultipleImages(images) : Promise.resolve([]);
      const imageUrls = await getImageUrls();

      //
      // upload article contents
      //
      const articleContents = {
        title: title,
        description: description,
        trading_place: location,
        price_min: need_price,
        time_in: getTs(dueDate),
        product_url: link,
      } as IPostArticle;
      if (imageUrls.length > 0) articleContents.img_urls = imageUrls;

      let res: AxiosResponse;
      if (isEdit && currentArticle) {
        res = await articleAPI.editArticle(id, articleContents);
      } else {
        res = await articleAPI.create(articleContents);
      }

      if (res.data.article_id || id) {
        navigateToArticle(res.data.article_id || id);
        finishSubmit();
      } else {
        navigation.navigate(AppRoutes.Home);
      }
    } catch (err) {
      console.log('ERROR', err);
      toaster.error('에러가 발생했습니다. 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
  }, [
    isEdit,
    currentArticle,
    description,
    dueDate,
    id,
    images,
    link,
    location,
    navigation,
    need_price,
    title,
    toaster,
    finishSubmit,
    checkInput,
    navigateToArticle,
    uploadMultipleImages,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          {isEdit ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Header.BackButton />
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
          disabled={loading}
          isLoading={loading}
        >
          완료
        </GButton>
      ),
      headerTitle: isEdit ? '글수정' : '글쓰기',
    });
  }, [loading, isEdit, navigation, submit]);

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
