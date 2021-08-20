import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from 'native-base';

import { Profile } from '@/components';
import { GButton } from '@/components/Gatgu/GButton';
import { ArticleStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { getTs } from '@/helpers/functions/time';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import useSelector from '@/helpers/hooks/useSelector';
import { EChattingRoomStackScreens } from '@/screens/ChattingRoomStack/ChattingRoomStack';
import { fetchingParticipants } from '@/store/chatSlice';
import { IArticleProps, IArticleStatus } from '@/types/article';
import { IUserSumProps } from '@/types/user';

import styles from './ProfileChat.style';

interface IProfileChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const navigation = useAppNavigation();
  const toaster = useToaster();
  const article_id = article.article_id;
  const dispatch = useDispatch();
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const isLogined = useSelector((state) => state.user.isLogined);
  const currentUser = useUserDetail().data;

  const isChattingButtonDisabled =
    !isLogined || orderStatus.progress_status > ArticleStatus.Dealing;

  const handleChattingButtonClick = (resendKey: string) => {
    const isResent = parseInt(resendKey) !== -1;
    const websocket_id = isResent ? resendKey : `${getTs()}`;

    const wsMessage = {
      type: WSMessage.ENTER_ROOM,
      data: {
        room_id: article_id,
        user_id: currentUser?.id,
      },
      websocket_id: websocket_id,
    };
    sendWsMessage(wsMessage, {
      resolveCondition: (data) => data.type === WSMessage.ENTER_ROOM_SUCCESS,
      rejectCondition: (data) => data.type === WSMessage.ENTER_ROOM_FAILURE,
    })
      .then((result) => {
        if (article_id) {
          navigation.navigate({
            name: EChattingRoomStackScreens.ChattingRoom,
            params: { id: article_id },
          });
          // trigger fetch to change store's participantsList -> affect chatting drawer
          if (result.data == 201) {
            dispatch(fetchingParticipants(article_id));
          }
        }
      })
      .catch(() => {
        toaster.error(
          '채팅방에 입장하지 못 했습니다. 네트워크 연결을 확인해주세요.'
        );
      });
  };

  const renderProfile = () => {
    const { nickname, profile_img, id } = article.writer;
    return <Profile id={id} nickname={nickname} picture={profile_img} />;
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      alignItems="center"
      style={[styles.profileChatContainer]}
    >
      {renderProfile()}
      <GButton
        disabled={isChattingButtonDisabled}
        onPress={() => handleChattingButtonClick('-1')}
      >
        구매 채팅으로 가기
      </GButton>
    </Flex>
  );
}
export default ProfileChat;
