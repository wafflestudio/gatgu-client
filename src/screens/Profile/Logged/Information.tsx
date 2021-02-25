import { View, Text, ImageBackground } from 'react-native';
import styles from './Information.style';
import React from 'react';

// Info JSX: 유저 이름 ~ 인증 여부
// TODO: API 확정되고 User Type 완성되면 any 치워야 됨
function Info({ dummyInfo }: any): JSX.Element {
  const profileImg = { uri: dummyInfo.profileUrl };

  return (
    <View style={styles.container}>
      <ImageBackground source={profileImg} style={styles.profileImg} />
      <View style={styles.content}>
        <Text style={styles.detailNameText}>{dummyInfo.name}</Text>
        <View style={styles.authView}>
          <Text style={styles.detailText}>{dummyInfo.date}</Text>
          <Text style={styles.detailText}>
            {dummyInfo.auth ? '인증' : '미인증'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Info;
