import { View, Text, ImageBackground } from 'react-native';
import styles from './Information.style';
import React from 'react';
import { IProfileProps } from '.';

// Info JSX: 유저 이름 ~ 인증 여부
function Info({ profile }: IProfileProps): JSX.Element {
  const profileImg = { uri: profile.userprofile.picture };

  return (
    <View style={styles.container}>
      <ImageBackground source={profileImg} style={styles.profileImg} />
      <View style={styles.content}>
        <Text style={styles.detailNameText}>
          {profile.userprofile.nickname}
        </Text>
        <View style={styles.authView}>
          <Text style={styles.detailText}>
            {profile.userprofile.updated_at}
          </Text>
          <Text style={styles.detailText}>
            {profile.is_active ? '인증된 회원' : '인증되지 않은 회원'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Info;
