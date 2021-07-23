import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Image, View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { typo } from '@/styles';
import { IUserSimple } from '@/types/user';

import styles from './Profile.style';

type IProfileProps = Pick<
  IUserSimple['userprofile'],
  'profile_id' | 'nickname' | 'picture'
>;

function Profile({
  profile_id,
  picture,
  nickname,
}: IProfileProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.profile}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', { params: profile_id })}
      >
        <Image
          alt="profile"
          source={
            picture?.includes('http')
              ? {
                  uri: picture,
                }
              : require('@/assets/images/defaultProfile.png')
          }
          fallbackSource={require('@/assets/images/defaultProfile.png')}
          defaultSource={require('@/assets/images/defaultProfile.png')}
          style={styles.profileImg}
        />
      </TouchableOpacity>
      <Text style={{ ...typo.semiTitle }}>{nickname}</Text>
    </View>
  );
}
export default Profile;
