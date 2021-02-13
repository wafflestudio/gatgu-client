import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import PostBox from '@/components/Post/PostBox';
import styles from './Home.style';
import { IPostProps } from '@/types/post';
import { RootState } from '@/store';
import { getPostsPerPage } from '@/store/postSlice';

// TODO: check
// 왜인지 헤더가 엄청 내려왔는데 헤더 적용할 때 수정 부탁드립니다 희수님
function HomeTemplate(): JSX.Element {
  const dispatch = useDispatch();

  const { data: posts, hasError, page } = useSelector(
    (state: RootState) => state.post,
    shallowEqual
  );

  // 초기에 7개 렌더링
  useEffect(() => {
    dispatch(getPostsPerPage(page));
  }, []);

  const renderPost = ({ item }: { item: IPostProps }) => <PostBox {...item} />;

  const ErrorMsg = (
    <View>
      <Text> 서비스 연결이 불안정합니다. 다시 시도해주세요</Text>
    </View>
  );

  // posts가 바뀌는 경우만 재 렌더링, 0.9 threshold에 다다르면 그 다음 페이지에 해당하는
  // 포스트를 받아온다.
  const PostList = (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(_, ind) => String(ind)}
      onEndReached={() => {
        getPostsPerPage(page);
      }}
      onEndReachedThreshold={0.9}
    />
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text>이것은 헤더입니다^^</Text>
      </View>
      {hasError ? ErrorMsg : PostList}
    </View>
  );
}

export default HomeTemplate;
