import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Image, View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { typo } from '@/styles';
import { IUserSumProps } from '@/types/user';

import styles from './Profile.style';

function Profile({
  profile_id,
  picture,
  nickname,
}: IUserSumProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.profile}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', { params: profile_id })}
      >
        <Image
          alt="profile"
          source={{ uri: picture }}
          fallbackSource={require('@/assets/images/defaultThumnail.png')}
          style={styles.profileImg}
        />
      </TouchableOpacity>
      <Text style={{ ...typo.semiTitle }}>{nickname}</Text>
    </View>
  );
}
export default Profile;
