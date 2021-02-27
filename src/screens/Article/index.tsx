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
import { initialArticle } from '@/constants/InitialState';
import { getSingleArticle } from '@/store/articleSlice';
import { RootState } from '@/store';
// TODO:
// - display several images instead of one (after eject --> crop-picker)
// - add buttons to navigate through images
// - change styles when clicked on (chatting button)
// - navigate to user profile when Profile Pic pressed

const [Error] = createError();

function ArticlePage(): JSX.Element {
  const [article, setArticle] = useState<IArticleProps>(initialArticle);
  const [hasError, setError] = useState(false);
  const route = useRoute<RouteProp<ArticleDrawerParamList, 'ArticlePage'>>();
  const id = route.params.id;
  const dispatch = useDispatch();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );

  useEffect(() => {
    dispatch(getSingleArticle(id));
    setArticle(currentArticle);
    setError(false);
    // handle error true case
  }, []);

  return (
    <View style={styles.container}>
      {hasError ? (
        Error(401)
      ) : (
        <ScrollView>
          <ProductImages {...article} />
          <ProfileChat {...article} />
          <TitleInfo {...article} />
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
