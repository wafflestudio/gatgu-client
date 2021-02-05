import { Label, Title } from 'native-base';
import React from 'react';
import { ScrollView, View, Text, Image, Button, Alert } from 'react-native';
import Header from '@/components/Header';
import styles from './style';

// TODO:
//  - remove header to somewhere else
//  - remove dummy
//  - change displaying image to adding image --> find which library
//  - circle css 하나로 합치기 (페이지 번호)

const dummyArticle = {
  dummyImage: 'https://reactnative.dev/img/tiny_logo.png',
  title: "Let's buy something!",
  needPeople: 3,
  needMoney: 20000,
  location: 'Seoul National Univeristy 301dong 314',
  description: 'All I wanna do is eat popcorn, netflix and chill.',
};

const WriteArticle = () => {
  const Title = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>제목: </Label>
      <Text>{dummyArticle.title}</Text>
    </View>
  );

  const Recruiting = (
    <View style={styles.subContainer}>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모집인원: </Label>
        <Text>{dummyArticle.needPeople}</Text>
      </View>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모금금액: </Label>
        <Text>{dummyArticle.needMoney}</Text>
      </View>
    </View>
  );

  const Location = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>위치: </Label>
      <Text>{dummyArticle.location}</Text>
    </View>
  );

  const Description = (
    <View style={styles.descriptionContainer}>
      <Label style={styles.label}>내용: </Label>
      <Text style={styles.description}>{dummyArticle.description}</Text>
    </View>
  );

  return (
    <ScrollView>
      <Header />
      <View style={styles.circleContainer}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
      <View>
        <Image
          style={styles.photo}
          source={{
            uri: dummyArticle.dummyImage,
          }}
        />
      </View>
      {Title}
      {Recruiting}
      {Location}
      {Description}
      <Button title="완료" onPress={() => Alert.alert('Complete!')} />
    </ScrollView>
  );
};

export default WriteArticle;
