import { View } from 'native-base';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './ProfileModify.styles';
import React from 'react';

// TODO: remove this after API 확정
const dummyInfo = {
  profileUrl: 'https://reactjs.org/logo-og.png',
  name: '같구',
  date: '1920-10-80',
  auth: false,
  grade: 2,
  emdrmqwltn: 128,
  dmdekqfbf: 97,
  e_response_time: 10,
  worjfogmlakdfbf: 100,
};

function ProfileModify(): JSX.Element {
  const [nickname, setNickname] = useState('');
  const profileImg = { uri: dummyInfo.profileUrl };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageBackground source={profileImg} style={styles.profileImg} />
      </View>
      <View style={styles.nickContainer}>
        <TextInput
          style={styles.nickInput}
          value={nickname}
          onChangeText={(e) => setNickname(e)}
          placeholder="별명"
        />
      </View>
    </View>
  );
}

export default ProfileModify;
