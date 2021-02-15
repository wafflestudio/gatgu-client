import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { ArticleBox } from './Article';
import styles from './Home.style';
import { IArticleSumProps } from '@/types/article';
import { RootState } from '@/store';
import { getArticlesPerPage } from '@/store/articleSlice';
import { createError } from '@/helpers/functions';

const [Error] = createError();

function HomeTemplate(): JSX.Element {
  const dispatch = useDispatch();

  const { data: posts, hasError, page } = useSelector(
    (state: RootState) => state.article,
    shallowEqual
  );

  // 초기에 7개 렌더링
  useEffect(() => {
    dispatch(getArticlesPerPage(page));
  }, []);

  const renderArticle = ({ item }: { item: IArticleSumProps }) => (
    <ArticleBox {...item} />
  );

  // posts가 바뀌는 경우만 재 렌더링, 0.9 threshold에 다다르면 그 다음 페이지에 해당하는
  // 포스트를 받아온다.
  const ArticleList = (
    <FlatList
      data={posts}
      renderItem={renderArticle}
      keyExtractor={(_, ind) => String(ind)}
      onEndReached={() => {
        getArticlesPerPage(page);
      }}
      onEndReachedThreshold={0.5}
    />
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text>이것은 헤더입니다^^</Text>
      </View>
      {/* Error 안에 error status code 넣기 */}
      {/* 임시로 401 넣어 놓음 */}
      {hasError ? Error(401) : ArticleList}
    </View>
  );
}

export default HomeTemplate;
