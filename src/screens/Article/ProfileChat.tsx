import { View } from 'native-base';
import React from 'react';
import styles from './ProfileChat.style';
import { Profile } from '@/components';
import Chat from './Chat';
import { IArticleProps } from '@/types/article';

// TODO: change input type
function ProfileChat(article: IArticleProps): JSX.Element {
  return (
    <View style={styles.userContainer}>
      <View style={styles.profileContainer}>
        <Profile {...article.writer} />
      </View>
      <Chat />
    </View>
  );
}
export default ProfileChat;
