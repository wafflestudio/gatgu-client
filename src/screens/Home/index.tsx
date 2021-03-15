import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { ArticleBox } from '@/components';
import { IArticleSumProps, TLoad } from '@/types/article';
import { RootState } from '@/store';
import { getArticlesSum } from '@/store/articleSlice';
import { createError } from '@/helpers/functions';
import { MAX_ARTICLE_NUM } from '@/constants/Enum';
import AppLoading from '@/screens/AppLoading';

import styles from './Home.style';

const [Error] = createError();

function HomeTemplate(): JSX.Element {
  const dispatch = useDispatch();
  const { data: articles, hasError, errorStatus, isLoading } = useSelector(
    (state: RootState) => state.article,
    shallowEqual
  );

  const [throttled, setThrottled] = useState(false);

  const getArticleSumCB = useCallback(
    (type: TLoad) => {
      dispatch(getArticlesSum(type));
    },
    [dispatch]
  );

  // 초기 렌더링
  useEffect(() => {
    getArticleSumCB('first');
  }, [getArticleSumCB]);

  const renderArticle = useCallback(
    ({ item }: { item: IArticleSumProps }) => <ArticleBox {...item} />,
    []
  );

  // 아티클 개수가 MAX_ARTICLE_NUM 보다 많으면 추가적으로 아티클을 받을 때 앞의 아티클을
  // 날린다. 이후 다시 위로 올라가면 기존의 아티클을 받아와야 하기 때문에, 아티클이 MAX_ARTICLE_NUM
  // 보다 많고 쓰로틀링된 상태가 아니라면 리퀘스트 보냄
  const onContentOffsetChanged = useCallback(
    (distanceFromTop: number) => {
      if (throttled || articles.length < MAX_ARTICLE_NUM) return;
      setTimeout(() => {
        setThrottled(false);
        distanceFromTop === 0 && getArticleSumCB('previous');
      }, 200);
    },
    [throttled, articles, getArticleSumCB]
  );

  const onScrollCB = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) =>
      onContentOffsetChanged(event.nativeEvent.contentOffset.y),
    [onContentOffsetChanged]
  );

  const ArticleList = useMemo(
    () => (
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(_, ind) => String(ind)}
        onRefresh={() => getArticleSumCB('first')}
        onEndReached={() => getArticleSumCB('next')}
        onEndReachedThreshold={1}
        onScroll={onScrollCB}
        scrollEventThrottle={1}
        refreshing={isLoading}
        getItemLayout={(_, index) => ({
          length: 141,
          offset: 141 * index,
          index,
        })}
      />
    ),
    [articles, getArticleSumCB]
  );

  return (
    <>
      {isLoading && !articles.length ? (
        <AppLoading />
      ) : (
        <View style={styles.root}>
          {hasError ? Error(errorStatus) : ArticleList}
        </View>
      )}
    </>
  );
}

export default HomeTemplate;
