import { View, Text, ImageBackground } from 'react-native';
import styles from './Profile.Style';
import React from 'react';

// Info JSX: 유저 이름 ~ 인증 여부
// TODO: API 확정되고 User Type 완성되면 any 치워야 됨
function Info({ dummyInfo }: any): JSX.Element {
  const profileImg = { uri: dummyInfo.profileUrl };

  return (
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
  );
}

export default Info;
