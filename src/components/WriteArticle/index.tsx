import { Label, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Header from '@/components/Header';
import styles from './style';
import { TagArray } from '@/constants/Enum';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { TagType } from '@/types/navigation';
import { useDispatch } from 'react-redux';
import { postArticle, fetchIssue } from '@/store/articleSlice';

// TODO:
//  - remove dummy
//  - change displaying image to adding image --> find which library
//  - circle css 하나로 합치기 (페이지 번호)
//  - add code for deleting all non numeric for people, price
//  - 위치 입력을 우편번호, 상세주소 형태로 받기
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
//  - tag 선택되면 배경 색 바꾸기

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

interface IDProps {
  org: string;
  repo: string;
  issueId: number;
  showIssuesList: () => void;
}

const flatten = (arr: TagType[][]) => {
  const newarr: TagType[] = [];
  arr.forEach((sub) => sub.forEach((tag) => newarr.push(tag)));
  return newarr;
};
const flatArray = flatten(TagArray);

function WriteArticle() {
  const [title, setTitle] = useState('');
  const [need_people, setPeople] = useState('');
  const [need_price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [images, addImage] = useState([]);
  const [tags, toggleTags] = useState(flatArray);
  const dispatch = useDispatch();

  const changeNumber = (txt: string, num: number) => {
    // code for dismissing all letters
    // code for max limit
    if (num == 0) setPeople(txt);
    else setPrice(txt);
  };
  const handleTag = (str: string) => {
    toggleTags(
      tags.map((tag) =>
        tag.tag == str ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };
  const submit = () => {
    const people_count = parseInt(need_people);
    const price = parseInt(need_price);
    const product_url = link;
    const thumbnail_url = images;
    const temp_author_id = 0;

    dispatch(
      postArticle({
        title,
        people_count,
        price,
        location,
        description,
        product_url,
        // thumbnail_url,
        temp_author_id,
      })
    );
  };

  const Title = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>제목: </Label>
      <TextInput
        style={styles.text}
        placeholder="제목"
        onChangeText={(txt) => setTitle(txt)}
        value={title}
      />
    </View>
  );

  const Recruiting = (
    <View style={styles.subContainer}>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모집인원: </Label>
        <TextInput
          style={styles.text}
          keyboardType="number-pad"
          placeholder="모집인원"
          onChangeText={(txt) => changeNumber(txt, 0)}
          value={need_people}
          maxLength={5}
        />
      </View>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모금금액: </Label>
        <TextInput
          style={styles.text}
          keyboardType="number-pad"
          placeholder="모집금액"
          onChangeText={(txt) => changeNumber(txt, 1)}
          value={need_price}
          maxLength={10}
        />
      </View>
    </View>
  );

  const Location = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>위치: </Label>
      <TextInput
        style={styles.text}
        placeholder="상세주소"
        onChangeText={(txt) => setLocation(txt)}
        value={location}
      />
    </View>
  );

  const Link = (
    <View style={styles.subContainer}>
      <Label style={styles.label}>구매처 링크: </Label>
      <TextInput
        style={[styles.description, styles.text]}
        placeholder="구매링크"
        onChangeText={(txt) => setLink(txt)}
        value={link}
      />
    </View>
  );

  const Description = (
    <View style={styles.bigContainer}>
      <Label style={styles.label}>내용: </Label>
      <TextInput
        style={[styles.description, styles.text]}
        placeholder="내용"
        onChangeText={(txt) => setDescription(txt)}
        value={description}
      />
    </View>
  );

  const Tags = (
    <View style={styles.bigContainer}>
      <Label style={[styles.label, inline.padding]}>태그</Label>
      {TagArray.map((arr, k) => (
        <View key={k} style={inline.outer}>
          {arr.map((tag) => (
            <View key={tag.id} style={inline.margin}>
              <TouchableHighlight onPress={() => handleTag(tag.tag)}>
                {tag.selected ? (
                  <View style={[inline.inner, inline.selected]}>
                    <Text>{tag.tag}</Text>
                  </View>
                ) : (
                  <View style={[inline.inner]}>
                    <Text>{tag.tag}</Text>
                  </View>
                )}
              </TouchableHighlight>
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
      <Button title="완료" onPress={() => submit()} />
    </ScrollView>
  );
}

const inline = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inner: {
    borderWidth: 1,
    padding: 10,
  },
  padding: {
    marginTop: 7,
    marginBottom: 6,
  },
  margin: {
    margin: 5,
  },
  selected: {
    backgroundColor: 'grey',
  },
});

export default WriteArticle;
