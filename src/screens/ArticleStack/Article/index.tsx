import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';

import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { TAppStackParamList } from '@/App.router';
import { Header } from '@/components';
import Error from '@/components/Error';
import { RESET_SCREEN } from '@/constants/navigateOption';
import ga from '@/helpers/functions/ga';
import { useUserDetail } from '@/helpers/hooks/api';
import useConditionMetOnetimeEffect from '@/helpers/hooks/useConditionMetOnetimeEffect';
import { EHomeStackScreens } from '@/screens/HomeStack/HomeStack';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';

import { EArticleStackScreens } from '../ArticleStack';
import ArticleHeader from './ArticleHeader';
import ArticleShimmer from './ArticleShimmer/ArticleShimmer';
import Desc from './Desc';
import ProductImages from './ProductImages';
import ProfileChat from './ProfileChat';

function ArticlePage(): JSX.Element {
  const route = useRoute<
    RouteProp<TAppStackParamList, EArticleStackScreens.Article>
  >();

  const dispatch = useDispatch();

  const id = route.params?.id;

  const navigation = useNavigation();
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const { data: user } = useUserDetail();

  const islogined = !!useSelector((state: RootState) => state.user.isLogined);
  const { currentArticle, isLoading, error } = useSelector(
    (state: RootState) => state.article
  );

  const fetchArticle = () => {
    dispatch(getSingleArticle(id));
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLoggingPossible = React.useCallback(() => {
    return currentArticle.article_id > 0 && !isLoading;
  }, [currentArticle, isLoading]);

  useConditionMetOnetimeEffect(
    () => {
      console.log(
        '!!\n\n!!',
        JSON.stringify({
          article_title: currentArticle.title,
          article_id: currentArticle.article_id,
          userId: user?.id,
        })
      );
      ga.logAriticleView({
        article_title: currentArticle.title,
        article_id: currentArticle.article_id,
        userId: user?.id,
      });
    },
    [currentArticle],
    checkLoggingPossible
  );

  useEffect(() => {
    if (route.params?.navigateFlag === RESET_SCREEN) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.navigateFlag]);

  const ErrorModal = useCallback(() => {
    return (
      <Error
        title="에러 발생"
        description="네트워크 연결을 다시 시도주세요."
        errCallback={fetchArticle}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorModal />;
  }

  if (isLoading) {
    return <ArticleShimmer />;
  }

  return (
    <View style={styles.container}>
      <Header
        leftCallback={() => {
          if (
            route.params.navigateFlag === RESET_SCREEN ||
            !navigation.canGoBack()
          ) {
            navigation.navigate('MainStack', {
              screen: EHomeStackScreens.Home,
            });
          } else {
            navigation.goBack();
          }
        }}
        right={islogined ? <Octicons name="three-bars" size={28} /> : null}
        rightCallback={() =>
          !chatLoading && navigation.dispatch(DrawerActions.toggleDrawer())
        }
        title="같구 모집글"
        left={<Header.BackButton />}
      />
      <ScrollView>
        <ProductImages
          image_urls={currentArticle.images}
          articleStatus={currentArticle.article_status}
        />
        <ProfileChat
          article={currentArticle}
          orderStatus={currentArticle.article_status}
          chatLoading={chatLoading}
          setChatLoading={setChatLoading}
        />
        <ArticleHeader
          title={currentArticle.title}
          time_in={currentArticle.time_in}
          updated_at={currentArticle?.updated_at}
          article_status={currentArticle.article_status}
          trading_place={currentArticle.trading_place}
          price_min={currentArticle.price_min}
        />
        <Desc
          description={currentArticle.description}
          product_url={currentArticle.product_url}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArticlePage;
