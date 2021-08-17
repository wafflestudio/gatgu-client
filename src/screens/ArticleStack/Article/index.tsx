import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Center, HamburgerIcon, Progress } from 'native-base';

import { DrawerActions, RouteProp, useRoute } from '@react-navigation/native';

import { TAppStackParamList } from '@/App.router';
import { Header } from '@/components';
import Error from '@/components/Error';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';

import { EArticleStackScreens } from '../ArticleStack';
import ArticleHeader from './ArticleHeader';
import Desc from './Desc';
import ProductImages from './ProductImages';
import ProfileChat from './ProfileChat';

function ArticlePage(): JSX.Element {
  const route = useRoute<
    RouteProp<TAppStackParamList, EArticleStackScreens.Article>
  >();
  const id = route.params.id;
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const islogined = !!useSelector((state: RootState) => state.user.isLogined);

  const {
    currentArticle,
    articleIsLoading,
    articleHasError,
    articleErrorStatus,
  } = useSelector((state: RootState) => state.article);

  useEffect(() => {
    dispatch(getSingleArticle(id));
  }, [dispatch, id]);

  const ErrorModal = useCallback(() => {
    return (
      <Error
        title="에러 발생"
        description={`${articleErrorStatus}`}
        errCallback={() => {
          console.log('ERROR');
        }}
      />
    );
  }, [articleErrorStatus]);

  if (articleIsLoading) {
    return (
      <Center>
        <Progress />
      </Center>
    );
  }

  if (articleHasError) {
    return <ErrorModal />;
  }

  return (
    <View style={styles.container}>
      <Header
        right={islogined ? <HamburgerIcon /> : null}
        rightCallback={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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
