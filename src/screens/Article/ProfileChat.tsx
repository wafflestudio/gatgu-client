import { View } from 'native-base';
import React from 'react';
import styles from './ProfileChat.style';
import Profile from './Profile';
import Chat from './Chat';

// TODO: change input type
function ProfileChat({ dummyArticle, navigation }: any): JSX.Element {
  return (
    <View style={styles.userContainer}>
      <Profile dummyArticle={dummyArticle} />
      <Chat navigation={navigation} />
    </View>
  );
}
export default ProfileChat;
