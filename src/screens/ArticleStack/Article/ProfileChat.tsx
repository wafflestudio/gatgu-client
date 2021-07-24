import React, { useEffect, useState } from 'react';

import { Button, Flex } from 'native-base';

import { EAppStackScreens } from '@/App.router';
import { userAPI } from '@/apis';
import { Profile } from '@/components';
import { ArticleStatus } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import useShallowSelector from '@/helpers/hooks/useSelector';
import { EChattingRoomStackScreens } from '@/screens/ChattingRoomStack/ChattingRoomStack';
import { palette } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';
import { IUserSimple } from '@/types/user';

import styles from './ProfileChat.style';

type TWsEnterRoomSuccess = {
  type: 'ENTER_ROOM_SUCCESS';
  data: unknown;
};

interface IProfileChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const navigation = useAppNavigation();

  const { sendWsMessage } = GatguWebsocket.useMessage<TWsEnterRoomSuccess>({
    onmessage: (e) => {
      switch (e.type) {
        case 'ENTER_ROOM_SUCCESS':
          navigation.navigate(EAppStackScreens.ChattingRoomStack, {
            screen: EChattingRoomStackScreens.ChattingRoom,
            params: {
              id: article.article_id,
            },
          });
          break;
        // no default
      }
    },
  });

  const isLogined = !!useShallowSelector((state) => state.user.accessToken);

  const isChattingButtonDisabled =
    !isLogined || orderStatus.progress_status > ArticleStatus.Dealing;

  const [writer, setWriter] = useState<IUserSimple>();

  const handleChattingButtonClick = () => {
    sendWsMessage({
      type: 'ENTER_ROOM',
      data: {
        id: article.article_id,
      },
    });
  };

  useEffect(() => {
    if (!isLogined) return;

    userAPI.getOtherUserData(article.writer_id).then((res) => {
      setWriter(res.data);
    });
    // eslint-disable-next-line
  }, []);

  const renderProfile = () => {
    if (!isLogined) {
      return null;
    }

    return <Profile {...(writer as any)} />;
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      style={[
        styles.profileChatContainer,
        !isLogined && {
          justifyContent: 'flex-end',
        },
      ]}
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
