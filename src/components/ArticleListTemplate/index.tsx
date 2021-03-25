import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import ArticleBox from '../ArticleBox';
import { IArticleSumProps, TLoad } from '@/types/article';
import { MAX_ARTICLE_NUM, GetArticleSumStatus } from '@/constants/article';
import AppLoading from '@/screens/AppLoading';

import styles from './ArticleListTemplate.style';

interface IArticleListTemplateProps {
  Error: (errorStatus: number) => JSX.Element;
  data: any;
  hasError: boolean;
  errorStatus: number;
  isLoading: boolean;
  isLastPage: boolean;
  isFirstPage: boolean;
  getArticles: any;
}

function ArticleListTemplate({
  data: articles,
  Error,
  hasError,
  errorStatus,
  isLoading,
  isLastPage,
  isFirstPage,
  getArticles,
}: IArticleListTemplateProps): JSX.Element {
  const dispatch = useDispatch();
  const getArticleSumCB = useCallback(
    (type: TLoad) => {
      if ((type === 'next' || type === 'first') && isLastPage) return;
      dispatch(getArticles(type));
    },
    [dispatch, isLastPage]
  );

  const renderArticle = useCallback(
    ({ item }: { item: IArticleSumProps }) => <ArticleBox {...item} />,
    []
  );

  // 아티클 개수가 MAX_ARTICLE_NUM 보다 많으면 추가적으로 아티클을 받을 때 앞의 아티클을
  // 날린다. 이후 다시 위로 올라가면 기존의 아티클을 받아와야 하기 때문에, 아티클이 MAX_ARTICLE_NUM
  // 보다 많고 쓰로틀링된 상태가 아니라면 리퀘스트 보냄
  const onContentOffsetChanged = useCallback(
    (distanceFromTop: number) => {
      if (
        articles.length < MAX_ARTICLE_NUM ||
        distanceFromTop !== 0 ||
        isFirstPage
      )
        return;
      _.throttle(() => getArticleSumCB(GetArticleSumStatus.PREVIOUS), 300)();
    },
    [articles, getArticleSumCB]
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
        onRefresh={() => getArticleSumCB(GetArticleSumStatus.FIRST)}
        onEndReached={() => getArticleSumCB(GetArticleSumStatus.NEXT)}
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

  if (isLoading && !articles.length) {
    return <AppLoading />;
  }

  return (
    <View style={styles.root}>
      {hasError ? Error(errorStatus) : ArticleList}
    </View>
  );
}

export default ArticleListTemplate;
