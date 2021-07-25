import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import ProfileDummyImage from '@/assets/icons/ProfileDummyImage/ProfileDummyImage.svg';
import { IUserDetail } from '@/types/user';

import styles from './Information.style';

interface IInfoProps {
  profile: IUserDetail;
}

// Info JSX: 유저 이름 ~ 인증 여부
function Info({ profile }: IInfoProps): JSX.Element {
  const profileImgExist = !!profile.userprofile.picture;
  const profileImg = profileImgExist ? (
    <ImageBackground
      source={{ uri: profile.userprofile.picture }}
      style={styles.profileImg}
    />
  ) : (
    <ProfileDummyImage style={styles.profileImg} />
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.profileImgInnerWrapper,
        }}
      >
        {profileImg}
      </View>
      <Text style={styles.detailNameText}>{profile.userprofile.nickname}</Text>
    </View>
  );
}

export default Info;
