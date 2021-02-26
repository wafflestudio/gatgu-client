import { View } from 'native-base';
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from './Profile.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';
import { useNavigation } from '@react-navigation/native';

function Profile({
  writer: { profile_id, picture, nickname },
}: IArticleProps): JSX.Element {
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
