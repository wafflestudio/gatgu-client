import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/native';

import { TAppStackParamList } from '@/App.router';
import AppLoading from '@/components/AppLoading';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';

import Desc from './Desc';
import ProductImages from './ProductImages';
import ProfileChat from './ProfileChat';
import TitleInfo from './TitleInfo';

// TODO: @juimdpp
// - change styles when clicked on (chatting button)

function ArticlePage(): JSX.Element {
  const [GetisLoading, setGetLoadingStatus] = useState(true);
  const [GethasError, setGetErrorStatus] = useState(false);
  const [, setErrno] = useState(-100);
  const route = useRoute<RouteProp<TAppStackParamList, 'Article'>>();
  const id = route.params.id;
  const dispatch = useDispatch();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );
  const loading = useSelector(
    (state: RootState) => state.article.articleIsLoading
  );
  const error = useSelector(
    (state: RootState) => state.article.articleHasError
  );
  const errNum = useSelector(
    (state: RootState) => state.article.articleErrorStatus
  );

  useEffect(() => {
    setGetLoadingStatus(loading);
  }, [loading]);

  useEffect(() => {
    setGetErrorStatus(error);
  }, [error]);

  useEffect(() => {
    setErrno(errNum);
  }, [errNum]);

  useEffect(() => {
    dispatch(getSingleArticle(id));
  }, [dispatch, id]);

  if (currentArticle.article_status === undefined) {
    // TODO:
    // loading
    return <></>;
  }

  return (
    <View style={styles.container}>
      {GethasError ? null : GetisLoading ? (
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