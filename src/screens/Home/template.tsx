// import React from 'react';
// import { FlatList, View, Text } from 'react-native';
// import { connect, useSelector } from 'react-redux';

// import PostBox from '@/components/Post/PostBox';
// import styles from './style';
// import { IPostProps } from '@/types/post';
// import { RootState } from '@/store';
// import { AppDispatch } from '@/store/rootStore';
// import { getPostsPerPage, IPostSlice } from '@/store/postReducer';

// mock data
// const posts: IPostProps[] = new Array(15).fill({
//   title: '다이슨 청소기 공구',
//   dayLeft: '5일 남음',
//   created: '3분 전',
//   goal: '25,000원',
//   location: '사운드 마인드',
//   percent: 40,
//   uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
//   money: false,
// });

// interface IHomeTemplateProps {
//   getPostsPerPage: AppDispatch;
//   posts: IPostSlice;
// }

// 누군가는 헤더 컴포넌트 만들었을 것 같아 view로 해놨다.
// function HomeTemplate({ posts, getPostsPerPage }: IHomeTemplateProps) {
// useEffect(() => {
//   return;
// }, []);

//   const renderPost = ({ item }: { item: IPostProps }) => <PostBox {...item} />;

//   return (
//     <>
//       <View style={styles.header}>
//         <Text>이것은 헤더입니다^^</Text>
//       </View>
//       <FlatList
//         data={[]}
//         renderItem={renderPost}
//         keyExtractor={(_, ind) => String(ind)}
//       />
//     </>
//   );
// }

// const selectPosts = useSelector((state: RootState) => state.posts);

// const mapStateToProps = () => ({
// posts: selectPosts,
// });

// const mapDispatchToProps = { getPostsPerPage };

// export default connect(mapStateToProps, mapDispatchToProps)(HomeTemplate);
