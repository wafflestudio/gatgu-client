import { View } from 'native-base';
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from './Profile.style';
import { typo } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { IUserSumProps } from '@/types/user';

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
        <Image style={styles.profileImg} source={{ uri: picture }} />
      </TouchableOpacity>
      <Text style={{ ...typo.semiTitle }}>{nickname}</Text>
    </View>
  );
}
export default Profile;
