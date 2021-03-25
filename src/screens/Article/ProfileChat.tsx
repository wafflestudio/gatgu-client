import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import styles from './ProfileChat.style';
import { Profile } from '@/components';
import Chat from './Chat';
import { IArticleProps } from '@/types/article';
import { userAPI } from '@/apis';
import { AxiosResponse } from 'axios';
import { IUserProps, IUserSumProps } from '@/types/user';

interface IProfileChat {
  article: IArticleProps;
  orderStatus: number;
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const [writer, setWriter] = useState<IUserSumProps>();

  useEffect(() => {
    if (article.writer_id) {
      userAPI.getUser(article.writer_id).then((res: AxiosResponse) => {
        setWriter(res.data.userprofile);
      });
    }
  }, [article.writer_id]);

  return (
    <View style={styles.userContainer}>
      <View style={styles.profileContainer}>
        <Profile {...writer} />
      </View>
      <Chat orderStatus={orderStatus} />
    </View>
  );
}
export default ProfileChat;
