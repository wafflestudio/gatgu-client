import React from 'react';
import { FlatList, View, Text } from 'react-native';

import PostBox, { IPostProps } from '@/components/Post/PostBox';
import { SearchBar } from '@/components/Post';
import styles from './style';

// mock data
const posts: IPostProps[] = new Array(15).fill({
  title: '다이슨 청소기 공구',
  dayLeft: '5일 남았습니다.',
  gatherLeft: '5명/10명',
  location: '사운드 마인드',
  uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
});

// 누군가는 헤더 컴포넌트 만들었을 것 같아 view로 해놨다.
function HomeTemplate() {
  const renderPost = ({ item }: { item: IPostProps }) => <PostBox {...item} />;

  return (
    <>
      <View style={styles.header}>
        <Text>이것은 헤더입니다^^</Text>
      </View>
      <SearchBar />
      <FlatList
        style={styles.container}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(_, ind) => String(ind)}
      />
    </>
  );
}

export default HomeTemplate;
