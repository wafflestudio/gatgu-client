import { View } from 'native-base';
import React from 'react';
import styles from './ProfileChat.style';
import { Profile } from '@/components';
import Chat from './Chat';
import { IArticleProps } from '@/types/article';

interface IProfileChat {
  article: IArticleProps;
  orderStatus: string;
}
// TODO: change input type
function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  return (
    <View style={styles.userContainer}>
      <View style={styles.profileContainer}>
        <Profile {...article.writer} />
      </View>
      <Chat {...orderStatus} />
    </View>
  );
}
export default ProfileChat;
