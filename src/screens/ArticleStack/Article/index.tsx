import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/native';

import { TAppStackParamList } from '@/App.router';
import AppLoading from '@/components/AppLoading';
import Error from '@/components/Error';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';

import Desc from './Desc';
import ProductImages from './ProductImages';
import ProfileChat from './ProfileChat';
import TitleInfo from './TitleInfo';

// TODO: @juimdpp
// - change styles when clicked on (chatting button)

function ArticlePage(): JSX.Element {
  const route = useRoute<RouteProp<TAppStackParamList, 'Article'>>();
  const id = route.params.id;
  const dispatch = useDispatch();

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
    return Error({
      errMsg: `${articleErrorStatus}`,
      errCallback: () => {
        console.log('ERROR');
      },
    });
  }, [articleErrorStatus]);

  if (currentArticle.article_status === undefined) {
    // TODO:
    // loading
    return <></>;
  }

  return (
    <View style={styles.container}>
      {articleHasError ? (
        ErrorModal
      ) : articleIsLoading ? (
        <AppLoading />
      ) : (
        <ScrollView>
          <ProductImages
            image_urls={currentArticle.images}
            orderStatus={currentArticle.article_status}
          />
          <ProfileChat
            article={currentArticle}
            orderStatus={currentArticle.article_status}
          />
          <TitleInfo
            article={currentArticle}
            orderStatus={currentArticle.article_status}
          />
          <Desc
            description={currentArticle.description}
            product_url={currentArticle.product_url}
          />
        </ScrollView>
      )}
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
