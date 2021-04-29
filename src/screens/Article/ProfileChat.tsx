import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { View } from 'native-base';

import { userAPI } from '@/apis';
import { Profile } from '@/components';
import { IArticleProps } from '@/types/article';
import { IUserSumProps } from '@/types/user';

import Chat from './Chat';
import styles from './ProfileChat.style';

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
      <Chat orderStatus={orderStatus} article_id={article.article_id} />
    </View>
  );
}
export default ProfileChat;
