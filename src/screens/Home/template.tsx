import React, { useEffect, useMemo } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PostBox from '@/components/Post/PostBox';
import styles from './style';
import { IPostProps } from '@/types/post';
import { RootState } from '@/store';
import { getPostsPerPage, IPostSlice } from '@/store/postReducer';

function HomeTemplate() {
  const dispatch = useDispatch();

  const { data: posts, hasError, page, pageLimit } = useSelector(
    (state: RootState) => state.post
  );

  // 초기에 7개 렌더링
  useEffect(() => {
    dispatch(getPostsPerPage(page));
  }, []);

  const renderPost = ({ item }: { item: IPostProps }) => <PostBox {...item} />;

  const ErrorMsg = useMemo(
    () => (
      <View>
        <Text> 서비스 연결이 불완전합니다. 다시 시도해주세요</Text>
      </View>
    ),
    []
  );

  // posts가 바뀌는 경우만 재 렌더링, 0.9 threshold에 다다르면 그 다음 페이지에 해당하는
  // 포스트를 받아온다.
  const PostList = useMemo(
    () => (
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(_, ind) => String(ind)}
        onEndReached={() => {
          getPostsPerPage(page);
        }}
        onEndReachedThreshold={0.9}
      />
    ),
    [posts]
  );

  return (
    <>
      <View style={styles.header}>
        <Text>이것은 헤더입니다^^</Text>
      </View>
      {hasError ? ErrorMsg : PostList}
    </>
  );
}

export default HomeTemplate;
