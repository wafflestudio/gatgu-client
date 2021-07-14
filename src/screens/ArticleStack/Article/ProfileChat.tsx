import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Button, Flex, View } from 'native-base';

import { EAppStackScreens } from '@/App.router';
import { userAPI } from '@/apis';
import { Profile } from '@/components';
import { ArticleStatus } from '@/enums';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import useShallowSelector from '@/helpers/hooks/useSelector';
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

  const isLogined = !!useShallowSelector((state) => state.user.accessToken);

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
    if (!isLogined) return;

    userAPI.getOtherUserData(article.writer_id).then((res) => {
      console.log(res.data);
      setWriter(res.data.userprofile);
    });
    // eslint-disable-next-line
  }, []);

  const renderProfile = () => {
    if (!isLogined) {
      return null;
    }

    return <Profile {...writer} />;
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      style={styles.profileChatContainer}
    >
      {renderProfile()}
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
