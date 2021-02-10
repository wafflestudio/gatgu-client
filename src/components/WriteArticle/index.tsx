import { Label, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Header from '@/components/Header';
import styles from './style';
import { TagArray } from '@/constants/Enum';
import { TagType } from '@/types/navigation';
import { useDispatch } from 'react-redux';
import { postArticle } from '@/store/articleSlice';
import * as ImagePicker from 'expo-image-picker';

// TODO:
//  - circle css 하나로 합치기 (페이지 번호)
//  - add code for deleting all non numeric for people, price
//  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정

const dummyImage = 'https://reactnative.dev/img/tiny_logo.png';

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
  const [image, setImage] = useState('');
  const [tags, toggleTags] = useState(TagArray);
  const dispatch = useDispatch();

  const changeNumber = (txt: string, num: number) => {
    // code for dismissing all letters
    // code for max limit
    if (num == 0) setPeople(txt);
    else setPrice(txt);
  };
  const handleTag = (id: number) => {
    const newarr: TagType[][] = [];
    tags.forEach((arr) => {
      const temp: TagType[] = [];
      arr.forEach((tag) => {
        if (tag.id === id) tag.selected = !tag.selected;
        temp.push(tag);
      });
      newarr.push(temp);
    });
    toggleTags(newarr);
  };
  const submit = () => {
    const people_count = parseInt(need_people);
    const price = parseInt(need_price);
    const product_url = link;
    const thumbnail_url = image;
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
  const pickImage = async () => {
    // Get permission to access photo gallery
    async () => {
      // confirm that the platform is on ios or android
      if (Platform.OS !== 'web') {
        // asynchronously ask for permission, receive status (whether granted permission or not)
        // status can either be 'granted', 'undetermined' or 'denied
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };

    // show window to select photo from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // which type of media that can be picked (in this case, images and videos)
      allowsEditing: true, // whether we can crop the image, trim the video
      aspect: [4, 3], // aspect ratio that is kept when editing
      quality: 1, // maximum quality of compression
    });

    // if user didn't cancel while picking an image, set state to the picked image's uri
    if (!result.cancelled) {
      setImage(result.uri);
    }
    // else do nothing
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
      {tags.map((arr, k) => (
        <View key={k} style={inline.outer}>
          {arr.map((tag) => (
            <View key={tag.id} style={inline.margin}>
              <TouchableHighlight onPress={() => handleTag(tag.id)}>
                <View style={[inline.inner, tag.selected && inline.selected]}>
                  <Text>{tag.tag}</Text>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const AddImage = (
    <View>
      {!image && (
        <Button title="Press here to add an image" onPress={pickImage} />
      )}
      <TouchableHighlight onPress={pickImage}>
        <Image
          style={styles.photo}
          source={{
            uri: image,
          }}
        />
      </TouchableHighlight>
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
      <Button title="완료" onPress={submit} />
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
