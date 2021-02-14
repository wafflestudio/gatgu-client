import { View } from 'native-base';
import React from 'react';
import { Text, Image } from 'react-native';
import styles from './Profile.style';
import { typo } from '@/styles';

// TODO: change input type
function Profile_Chat({ dummyArticle }: any): JSX.Element {
  return (
    <View style={styles.userContainer}>
      <View style={styles.profile}>
        <Image
          style={styles.profileImg}
          source={{ uri: dummyArticle.writer.picture }}
        />
        <Text style={{ ...typo.semiTitle }}>
          {dummyArticle.writer.nickname}
        </Text>
      </View>
    </View>
  );
}
export default Profile_Chat;
