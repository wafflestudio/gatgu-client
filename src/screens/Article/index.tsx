import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Desc from './Desc';
import Profile_Chat from './Profile_Chat';
import Images from './Images';
import Title_Info from './Title_Info';
import Header from '@/components/Header';

// TODO:
// - remove dummyArticle (connect with redux, server)
// - display several images instead of one
// - add buttons to navigate through images
// - change styles when clicked on (chatting button)
// - 남은 시간 어떻게 표시할지 + 계산하는 함수 작성 (in helper file)
// - implement golden bar (take from home page)
// - implement side bar

const dummyArticle = {
  id: 'article_id (integer)',
  writer: {
    profile_id: 1,
    picture:
      'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg',
    nickname: 'nickname',
    address: 'address',
    phonenumber: '010-0000-0000',
  },
  title: 'title (string)',
  description: `이상은 귀는 아름답고 쓸쓸한 그들의 위하여 동산에는 교향악이다. 실로 힘차게 이는 실현에 따뜻한 이것을 끓는다. 수 따뜻한 공자는 없으면, 것이다.보라, 얼마나 이것이다.\n
  커다란 고행을 밥을 노래하며 칼이다. 동력은 꽃 천고에 사막이다. 가치를 산야에 불어 가장 힘있다. 반짝이는 구하기 영원히 뭇 위하여, 투명하되 유소년에게서 살 것은 보라.\n
  청춘은 설산에서 사랑의 구하기 만물은 것이다. 영원히 열락의 충분히 이것이다. 인류의 위하여서, 든 청춘을 무엇이 있다.`,
  location: 'location in detail (string) ',
  product_url: [
    'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/unsplash-Josh-Earl.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrStQd2pI0BCacoGJxuT5fa-QADu4UUQTaaQ&usqp=CAU',
  ],
  thumbnail_url: 'https://www.dw.com/image/43055387_403.jpg',
  price_min: 15000,
  people_count_min: 3,
  created_at: new Date('2021-02-10'),
  updated_at: new Date('2021-02-10'),
  deleted_at: null,
  dueDate: new Date('2021-03-02'), // always in days, not in api but added it anyways bc in design
};

function ArticlePage(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={dummyArticle.title} left={true} right={true} />
        <Images dummyArticle={dummyArticle} />
        <Profile_Chat dummyArticle={dummyArticle} />
        <Title_Info dummyArticle={dummyArticle} />
        <Desc dummyArticle={dummyArticle} />
      </ScrollView>
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
