import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { Button, Flex } from 'native-base';

import { userAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { Profile } from '@/components';
import { ArticleStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { getTs } from '@/helpers/functions/time';
import { useUserDetail } from '@/helpers/hooks/api';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import useShallowSelector from '@/helpers/hooks/useSelector';
import { AppRoutes } from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import { fetchingParticipants } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';
import { IUserDetail, IUserSimple } from '@/types/user';

import styles from './ProfileChat.style';

interface IProfileChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const navigation = useAppNavigation();
  const article_id = article.article_id;
  const dispatch = useDispatch();
  const { sendWsMessage } = GatguWebsocket.useMessage();

  const currentUser = useUserDetail().data;

  const isLogined = !!useShallowSelector((state) => state.user.accessToken);

  const isChattingButtonDisabled =
    !isLogined || orderStatus.progress_status > ArticleStatus.Dealing;

  const [writer, setWriter] = useState<IUserSimple>();

  const handleChattingButtonClick = (resendKey: string) => {
    ////
    navigation.navigate(AppRoutes.ChattingRoom, {
      screen: 'ChattingRoom',
      params: { id: article_id },
    });
    ////
    const isResent = parseInt(resendKey) !== -1;
    const websocket_id = isResent ? resendKey : `${getTs()}`;

    const wsMessage = {
      type: WSMessage.ENTER_ROOM,
      data: {
        room_id: 150, //article_id,
        user_id: currentUser?.id,
      },
      websocket_id: websocket_id,
    };
    sendWsMessage(wsMessage)
      .then((result) => {
        if (article_id) {
          navigation.navigate(AppRoutes.ChattingRoom, {
            screen: 'ChattingRoom',
            params: { id: article_id },
          });
          // trigger fetch to change store's participantsList -> affect chatting drawer
          if (result.data == 201) {
            dispatch(fetchingParticipants(article_id));
          }
        }
      })
      .catch(() => {
        Alert.alert("Can't access chatroom. Check your connection");
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
        onPress={() => handleChattingButtonClick('-1')}
      >
        구매 채팅으로 가기
      </Button>
    </Flex>
  );
}
export default ProfileChat;
