import { Label, Title } from 'native-base';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import Header from '@/components/Header';
import styles from './style';
import { TagArray } from '@/constants/Enum';
// TODO:
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
  link:
    'How do I open a link?? Need to study Linking: https://reactnative.dev/docs/linking',
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

  const Link = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>구매처 링크: </Label>
      <Text style={styles.text}>{dummyArticle.link}</Text>
    </View>
  );

  const Description = (
    <View style={styles.bigContainer}>
      <Label style={styles.label}>내용: </Label>
      <Text style={styles.description}>{dummyArticle.description}</Text>
    </View>
  );

  const Tags = (
    <View style={styles.bigContainer}>
      <Label style={[styles.label, inline.padding]}>태그</Label>
      {TagArray.map((arr, k) => (
        <View key={k} style={inline.outer}>
          {arr.map((tag) => (
            <View key={tag.id} style={inline.inner}>
              <Text>{tag.tag}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const AddImage = (
    <View>
      <Image
        style={styles.photo}
        source={{
          uri: dummyArticle.dummyImage,
        }}
      />
    </View>
  );

  return (
    <ScrollView>
      <Header title="글 쓰기" left={true} right={false} />
      {Tags}
      {AddImage}
      {Title}
      {Recruiting}
      {Location}
      {Description}
      {Link}
      <Button title="완료" onPress={() => Alert.alert('Complete!')} />
    </ScrollView>
  );
};

const inline = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inner: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  padding: {
    marginTop: 7,
    marginBottom: 6,
  },
});

export default WriteArticle;
