import { Label, Title, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image } from 'react-native';
import Header from '@/components/Header';
import styles from './style';
import { TouchableHighlight } from 'react-native-gesture-handler';

// TODO:
// - remove dummyArticle (connect with redux, server)
// - display several images instead of one
// - add buttons to navigate through images
// - change styles when clicked on (chatting button)

const dummyArticle = {
  title: 'Protein',
  imagesURI: [
    'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/unsplash-Josh-Earl.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrStQd2pI0BCacoGJxuT5fa-QADu4UUQTaaQ&usqp=CAU',
  ],
  authorId: 1,
};
const dummyUser = {
  profileImg:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrStQd2pI0BCacoGJxuT5fa-QADu4UUQTaaQ&usqp=CAU',
  username: '에어팟',
};

function Article() {
  const chattingRedirect = () => {
    alert('Redirect to chatting room');
  };

  return (
    <ScrollView>
      <Header title={dummyArticle.title} left={true} right={true} />

      <Image style={styles.image} source={{ uri: dummyArticle.imagesURI[0] }} />

      <View style={styles.subContainer}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImg}
            source={{ uri: dummyUser.profileImg }}
          />
          <Text>{dummyUser.username}</Text>
        </View>
        <TouchableHighlight onPress={chattingRedirect}>
          <View style={styles.chattingButton}>
            <Text>구매 채팅으로 가기</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View>
        <Text>{dummyArticle.title}</Text>
      </View>
    </ScrollView>
  );
}

export default Article;
