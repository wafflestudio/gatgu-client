import { Label } from 'native-base';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
} from 'react-native';

// TODO: - remove header to somewhere else
//       - remove dummy
//       - change displaying image to adding image --> find which library

const dummyArticle = {
  dummyImage: 'https://reactnative.dev/img/tiny_logo.png',
  title: "Let's buy something!",
  needPeople: 3,
  needMoney: 20000,
  location: 'Seoul National Univeristy 301dong 314',
  description: 'All I wanna do is eat popcorn, netflix and chill.',
};

const WriteArticle = () => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text>Header that should be uniform and fixed</Text>
      </View>
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
      <View style={styles.titleContainer}>
        <Label style={styles.label}>제목: </Label>
        <Text>{dummyArticle.title}</Text>
      </View>
      <View style={styles.recruitContainer}>
        <View style={styles.recruitHalfContainer}>
          <Label style={styles.label}>모집인원: </Label>
          <Text>{dummyArticle.needPeople}</Text>
        </View>
        <View style={styles.recruitHalfContainer}>
          <Label style={styles.label}>모금금액: </Label>
          <Text>{dummyArticle.needMoney}</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Label style={styles.label}>위치: </Label>
        <Text>{dummyArticle.location}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Label style={styles.label}>내용: </Label>
        <Text>{dummyArticle.description}</Text>
      </View>
      <Button
        title="완료"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 75,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circle1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 14,
    height: 14,
    borderWidth: 1,
    margin: 6,
  },
  circle2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 14,
    height: 14,
    backgroundColor: 'black',
    margin: 6,
  },
  photo: {
    width: 350,
    height: 250,
  },
  titleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 60,
    alignItems: 'center',
  },
  recruitContainer: {
    height: 60,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recruitHalfContainer: {
    borderWidth: 1,
    height: 60,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    flex: 2,
  },
  label: {
    marginRight: 10,
  },
  subContainer: {
    height: 60,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    height: 175,
    borderWidth: 1,
  },
});

export default WriteArticle;
