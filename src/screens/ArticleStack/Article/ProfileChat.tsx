import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Button, Flex, View } from 'native-base';

import { EAppStackScreens } from '@/App.router';
import { userAPI } from '@/apis';
import { Profile } from '@/components';
import { ArticleStatus } from '@/enums';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { EChattingRoomStackScreens } from '@/screens/ChattingRoomStack/ChattingRoomStack';
import { palette } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';
import { IUserSumProps } from '@/types/user';

import styles from './ProfileChat.style';

interface IProfileChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const navigation = useAppNavigation();

  const isChattingButtonDisabled =
    orderStatus.progress_status > ArticleStatus.Dealing;

  const [writer, setWriter] = useState<IUserSumProps>();

  const handleChattingButtonClick = () => {
    navigation.navigate(EAppStackScreens.ChattingRoomStack, {
      screen: EChattingRoomStackScreens.ChattingRoom,
      params: {
        id: article.article_id,
      },
    });
  };

  useEffect(() => {
    if (article.writer_id) {
      userAPI.getMyData().then((res: AxiosResponse) => {
        setWriter(res.data.userprofile);
      });
    }
  }, [article.writer_id]);

  return (
    <Flex direction="row" justify="space-between">
      <View style={styles.profileContainer}>
        <Profile {...writer} />
      </View>
      <Button
        backgroundColor={palette.blue}
        color={palette.white}
        disabled={isChattingButtonDisabled}
        onPress={handleChattingButtonClick}
      >
        구매 채팅으로 가기
      </Button>
    </Flex>
  );
}
export default ProfileChat;
