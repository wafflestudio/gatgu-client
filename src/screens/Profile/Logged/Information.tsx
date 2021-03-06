import { View, Text, ImageBackground } from 'react-native';
import styles from './Information.style';
import React from 'react';
import { IUserProps } from '@/types/user';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';

interface IInfoProps {
  profile: IUserProps;
  color: string;
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

  // FIXME: @woohm402
  //   todo: remove backgroundColor:white and replace with proper color
  //   when: 현재 버전에서는 안 고쳐도 됩니다. 이거 생기는 버전에서 수정
  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.profileImgOuterWrapper, backgroundColor: 'white' }}
      >
        <View
          style={{
            ...styles.profileImgInnerWrapper,
          }}
        >
          {profileImg}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.detailNameText}>
          {profile.userprofile.nickname}
        </Text>
        {/* 
        FIXME: @woohm402
          todo: 나중에 결국 다시 생길 기능인데 지금은 빠짐
          when: 기능 생기면

        <View style={styles.authView}>
          <Text style={styles.detailText}>
            {profile.userprofile.updated_at}
          </Text>
          <Text style={styles.detailText}>
            {profile.is_active ? '인증된 회원' : '인증되지 않은 회원'}
          </Text>
        </View>
        */}
      </View>
    </View>
  );
}

export default Info;
