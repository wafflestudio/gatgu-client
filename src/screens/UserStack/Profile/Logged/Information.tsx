import React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { VStack } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import { GSpace, GText } from '@/components/Gatgu';
import { emptyURL } from '@/constants/image';
import { AppRoutes } from '@/helpers/routes';
import { IUserDetail } from '@/types/user';

import styles from './Information.style';

type IInfoProps = Pick<
  IUserDetail['userprofile'],
  'nickname' | 'picture' | 'trading_address'
> & {
  isMine?: boolean;
};

// Info JSX: 유저 이름 ~ 인증 여부
function Info({
  nickname,
  picture,
  trading_address,
  isMine,
}: IInfoProps): JSX.Element {
  const navigation = useNavigation();

  const profileImgExist = Boolean(picture) && picture !== emptyURL;

  const renderProfileImg = () => {
    const image = (
      <ImageBackground
        source={
          profileImgExist
            ? { uri: picture }
            : require('@/assets/images/defaultProfile.png')
        }
        style={styles.profileImg}
      />
    );

    if (!isMine)
      return <View style={styles.profileImgInnerWrapper}>{image}</View>;

    return (
      <TouchableOpacity
        style={{
          ...styles.profileImgInnerWrapper,
        }}
        onPress={() => navigation.navigate(AppRoutes.ProfileModify)}
      >
        {image}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderProfileImg()}
      <VStack justifyContent="center">
        <GText size={18} bold>
          {nickname}
        </GText>
        <GSpace h={10} />
        <GText>{trading_address}</GText>
      </VStack>
    </View>
  );
}

export default Info;
