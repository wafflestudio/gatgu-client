import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/native';

import { initialArticle, initialChatInfo } from '@/constants/InitialState';
import { createError } from '@/helpers/functions';
import AppLoading from '@/screens/AppLoading/AppLoading';
import { getSingleArticle } from '@/store/articleSlice/articleSlice';
import { getChatInfo } from '@/store/chatSlice/chatSlice';
import { RootState } from '@/store/rootState';
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
  const [GetisLoading, setGetLoadingStatus] = useState(true);
  const [GethasError, setGetErrorStatus] = useState(false);
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
  const _loading = useSelector(
    (state: RootState) => state.article.GetArticleIsLoading
  );
  const _error = useSelector(
    (state: RootState) => state.article.GetArticleHasError
  );
  const _errNum = useSelector(
    (state: RootState) => state.article.GetArticleErrorStatus
  );

  useEffect(() => {
    setGetLoadingStatus(_loading);
  }, [_loading]);

  useEffect(() => {
    setGetErrorStatus(_error);
  }, [_error]);

  useEffect(() => {
    setErrno(_errNum);
  }, [_errNum]);

  useEffect(() => {
    dispatch(getSingleArticle(id));
    dispatch(getChatInfo(id));
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
      {GethasError ? (
        Error(errno, () => {
          dispatch(getSingleArticle(id));
        })
      ) : GetisLoading ? (
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
