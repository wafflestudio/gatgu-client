import { View } from 'native-base';
import React from 'react';
import { Text, Image } from 'react-native';
import styles from './Profile.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';

// TODO: change input type
function Profile({ writer }: IArticleProps): JSX.Element {
  return (
    <View style={styles.profile}>
      <Image style={styles.profileImg} source={{ uri: writer.picture }} />
      <Text style={{ ...typo.semiTitle }}>{writer.nickname}</Text>
    </View>
  );
}
export default Profile;
