import { View, Text, ImageBackground } from 'react-native';
import styles from './Information.style';
import React from 'react';
import { IUserProps } from '@/types/user';

interface IInfoProps {
  profile: IUserProps;
  color: string;
}

// Info JSX: 유저 이름 ~ 인증 여부
function Info({ profile, color }: IInfoProps): JSX.Element {
  const profileImg = { uri: profile.userprofile.picture };

  // FIXME: remove backgroundColor and replace with proper color
  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.profileImgOuterWrapper, backgroundColor: 'yellow' }}
      >
        <View
          style={{
            ...styles.profileImgInnerWrapper,
            backgroundColor: 'red',
          }}
        >
          <ImageBackground source={profileImg} style={styles.profileImg} />
        </View>
      </View>
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
