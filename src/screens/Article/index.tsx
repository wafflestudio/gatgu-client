import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Desc from './Desc';
import ProfileChat from './ProfileChat';
import ProductImages from './ProductImages';
import TitleInfo from './TitleInfo';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ArticleDrawerParamList } from '@/types/navigation';
import { IArticleProps } from '@/types/article';
import { createError } from '@/helpers/functions';
import { initialArticle, initialChatInfo } from '@/constants/InitialState';
import { getSingleArticle } from '@/store/articleSlice';
import { getChatInfo } from '@/store/chatSlice';
import { RootState } from '@/store';
import { IChattingRoom } from '@/types/chat';
// TODO: @juimdpp
// - change styles when clicked on (chatting button)

const [Error] = createError();

function ArticlePage(): JSX.Element {
  const [article, setArticle] = useState<IArticleProps>(initialArticle);
  const [chatInfo, setChatInfo] = useState<IChattingRoom>(initialChatInfo);
  const [hasError, setError] = useState(false);
  const route = useRoute<RouteProp<ArticleDrawerParamList, 'ArticlePage'>>();
  const id = route.params.id;
  const dispatch = useDispatch();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );
  const currentChatInfo = useSelector(
    (state: RootState) => state.chat.currentChatInfo
  );

  useEffect(() => {
    dispatch(getSingleArticle(id));
    dispatch(getChatInfo(id));
    // handle error true case
  }, []);

  useEffect(() => {
    setArticle(currentArticle);
    setChatInfo(currentChatInfo);
    setError(false);
  }, [currentArticle, currentChatInfo]);

  const productImageProps = {
    thumbnail_url: article.thumbnail_url,
    image_url: article.image,
    orderStatus: chatInfo?.orderStatus,
  };

  const profileChatProps = {
    article: article,
    orderStatus: chatInfo?.orderStatus,
  };

  const titleInfoProps = {
    article: article,
    orderStatus: chatInfo?.orderStatus,
  };

  return (
    <View style={styles.container}>
      {hasError ? (
        Error(401)
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
