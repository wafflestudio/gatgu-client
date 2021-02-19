import { View } from 'native-base';
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from './Profile.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';
import { useNavigation } from '@react-navigation/native';

// TODO: change input type
function Profile({ writer }: IArticleProps): JSX.Element {
  const navigation = useNavigation();
  const profileRedirect = () => {
    navigation.navigate('Profile', { params: writer.profile_id });
  };
  return (
    <View style={styles.profile}>
      <TouchableOpacity onPress={profileRedirect}>
        <Image style={styles.profileImg} source={{ uri: writer.picture }} />
      </TouchableOpacity>
      <Text style={{ ...typo.semiTitle }}>{writer.nickname}</Text>
    </View>
  );
}
export default Profile;
