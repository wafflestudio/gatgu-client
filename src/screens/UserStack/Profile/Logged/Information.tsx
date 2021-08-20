import React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { VStack } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import ProfileDummyImage from '@/assets/icons/ProfileDummyImage/ProfileDummyImage.svg';
import { GSpace, GText } from '@/components/Gatgu';
import { emptyURL } from '@/constants/image';
import { AppRoutes } from '@/helpers/routes';
import { IUserDetail } from '@/types/user';

import styles from './Information.style';

interface IInfoProps {
  profile: IUserDetail;
}

// Info JSX: 유저 이름 ~ 인증 여부
function Info({ profile }: IInfoProps): JSX.Element {
  const navigation = useNavigation();

  const profileImgExist = profile.userprofile.picture !== emptyURL;
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
      <TouchableOpacity
        style={{
          ...styles.profileImgInnerWrapper,
        }}
        onPress={() => navigation.navigate(AppRoutes.ProfileModify)}
      >
        {profileImg}
      </TouchableOpacity>
      <VStack justifyContent="center">
        <GText size={18} bold>
          {profile.userprofile.nickname}
        </GText>
        <GSpace h={10} />
        <GText>{profile.userprofile.trading_address}</GText>
      </VStack>
    </View>
  );
}

export default Info;
