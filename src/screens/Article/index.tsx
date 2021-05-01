import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/native';

import { initialArticle, initialChatInfo } from '@/constants/InitialState';
import { createError } from '@/helpers/functions';
import AppLoading from '@/screens/AppLoading';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';
import { getChatInfo } from '@/store/chatSlice';
import { IArticleProps } from '@/types/article';
import { IChattingRoom } from '@/types/chat';
import { ArticleDrawerParamList } from '@/types/navigation';

import Desc from './Desc';
import ProductImages from './ProductImages';
import ProfileChat from './ProfileChat';
import TitleInfo from './TitleInfo';

// TODO: @juimdpp
// - change styles when clicked on (chatting button)

const [Error] = createError();

function ArticlePage(): JSX.Element {
  const [article, setArticle] = useState<IArticleProps>(initialArticle);
  const [chatInfo, setChatInfo] = useState<IChattingRoom>(initialChatInfo);
  const [isLoading, setLoadingStatus] = useState(true);
  const [hasError, setErrorStatus] = useState(false);
  const [errno, setErrno] = useState(-100);
  const route = useRoute<RouteProp<ArticleDrawerParamList, 'ArticlePage'>>();
  const id = route.params.id;
  const dispatch = useDispatch();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );
  const currentChatInfo = useSelector(
    (state: RootState) => state.chat.currentChatInfo
  );
  const loading = useSelector(
    (state: RootState) => state.article.GetArticleIsLoading
  );
  const error = useSelector(
    (state: RootState) => state.article.GetArticleHasError
  );
  const errNum = useSelector(
    (state: RootState) => state.article.GetArticleErrorStatus
  );

  useEffect(() => {
    setLoadingStatus(loading);
  }, [loading]);

  useEffect(() => {
    setErrorStatus(error);
  }, [error]);

  useEffect(() => {
    setErrno(errNum);
  }, [errNum]);

  useEffect(() => {
    dispatch(getSingleArticle(id));
    dispatch(getChatInfo(id));
    setLoadingStatus(true);
    setErrorStatus(false);
    // handle error true case
  }, [dispatch]);

  useEffect(() => {
    setArticle(currentArticle);
    setChatInfo(currentChatInfo);
  }, [currentArticle, currentChatInfo]);

  const productImageProps = {
    thumbnail_url: article.thumbnail_url,
    image_url: article.image,
    orderStatus: chatInfo?.order_status,
  };

  const profileChatProps = {
    article: article,
    orderStatus: chatInfo?.order_status,
  };

  const titleInfoProps = {
    article: article,
    orderStatus: chatInfo?.order_status,
  };

  return (
    <View style={styles.container}>
      {hasError ? (
        Error(errno, () => {
          dispatch(getSingleArticle(id));
        })
      ) : isLoading ? (
        <AppLoading />
      ) : (
        <ScrollView>
          <ProductImages {...productImageProps} />
          <ProfileChat {...profileChatProps} />
          <TitleInfo {...titleInfoProps} />
          <Desc {...article} />
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
