import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { ArticleBox } from '@/components';
import styles from './Home.style';
import { IArticleSumProps } from '@/types/article';
import { RootState } from '@/store';
import { getArticlesSum } from '@/store/articleSlice';
import { createError } from '@/helpers/functions';

const [Error] = createError();

function HomeTemplate(): JSX.Element {
  const dispatch = useDispatch();

  const { data: articles, hasError, errorStatus } = useSelector(
    (state: RootState) => state.article,
    shallowEqual
  );

  // 초기에 7개 렌더링
  useEffect(() => {
    dispatch(getArticlesSum('first'));
  }, []);

  const renderArticle = ({ item }: { item: IArticleSumProps }) => (
    <ArticleBox {...item} />
  );

  const ArticleList = (
    <FlatList
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(_, ind) => String(ind)}
      onRefresh={() => {
        getArticlesSum('first');
      }}
      onEndReached={() => {
        getArticlesSum('next');
      }}
      onEndReachedThreshold={0.5}
      onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
        onContentOffsetChanged(event.nativeEvent.contentOffset.y)
      }
    />
  );

  const onContentOffsetChanged = useCallback((distanceFromTop: number) => {
    distanceFromTop === 0 && getArticlesSum('previous');
  }, []);

  return (
    <View style={styles.root}>
      {hasError ? Error(errorStatus) : ArticleList}
    </View>
  );
}

export default HomeTemplate;
