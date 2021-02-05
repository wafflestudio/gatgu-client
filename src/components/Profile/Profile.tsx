import { View, Text, ImageBackground } from 'react-native';
import styles from './Profile.Style';
import React from 'react';

// TODO:remove
const dummyInfo = {
  profileUrl: 'https://reactjs.org/logo-og.png',
  name: '같구',
  date: '1920-10-80',
  auth: false,
};

const Profile = () => {
  const profileImg = { uri: dummyInfo.profileUrl };

  return (
    <>
      <View style={styles.header.container}>
        <Text>Hi</Text>
      </View>
      <View style={styles.info.container}>
        <ImageBackground source={profileImg} style={styles.info.profileImg} />
        <View style={styles.info.detail}>
          <Text style={styles.info.detailText}>유저 이름</Text>
          <View style={styles.info.authView}>
            <Text style={styles.info.detailText}>가입일자</Text>
            <Text style={styles.info.detailText}>인증 여부</Text>
          </View>
        </View>
        <View style={styles.info.content}>
          <Text style={styles.info.detailText}>{dummyInfo.name}</Text>
          <View style={styles.info.authView}>
            <Text style={styles.info.detailText}>{dummyInfo.date}</Text>
            <Text style={styles.info.detailText}>
              {dummyInfo.auth ? '인증' : '미인증'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.grade.container}>
        <Text>Hi</Text>
      </View>
      <View style={styles.history.container}>
        <Text style={styles.history.text}>거래내역 목록</Text>
      </View>
    </>
  );
};

export default Profile;
