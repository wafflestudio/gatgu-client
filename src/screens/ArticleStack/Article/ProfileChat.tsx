import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex } from 'native-base';

import { EAppStackScreens } from '@/App.router';
import { userAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { Profile } from '@/components';
import { GButton } from '@/components/Gatgu/GButton';
import { ArticleStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import useShallowSelector from '@/helpers/hooks/useSelector';
import { AppRoutes } from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import { EChattingRoomStackScreens } from '@/screens/ChattingRoomStack/ChattingRoomStack';
import { fetchingParticipants } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';
import { IUserDetail, IUserSimple } from '@/types/user';

import styles from './ProfileChat.style';

type TWsEnterRoomSuccess = {
  type: 'ENTER_ROOM_SUCCESS';
  data: unknown;
};

interface IProfileChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}
interface IObject {
  [key: string]: [number, number]; // [timeoutID, retry count]
}

function ProfileChat({ article, orderStatus }: IProfileChat): JSX.Element {
  const navigation = useAppNavigation();
  const article_id = article.article_id;
  const [retryMap, setRetryMap] = useState<IObject>({});
  const dispatch = useDispatch();

  const { sendWsMessage } = GatguWebsocket.useMessage<{
    type: string;
    data: number;
    websocketID: string;
  }>({
    onmessage: (socket) => {
      switch (socket.type) {
        case WSMessage.ENTER_ROOM_SUCCESS: {
          // clear timeout
          clearTimeout(retryMap[socket.websocketID][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocketID];
          setRetryMap(tempMap);

          // setsRetry(initRetry);
          if (article_id) {
            navigation.navigate(AppRoutes.ChattingRoom, {
              screen: 'ChattingRoom',
              params: { id: article_id },
            });
            // trigger fetch to change store's participantsList -> affect chatting drawer
            if (socket.data == 201) {
              dispatch(fetchingParticipants(article_id));
            }
          }
          break;
        }
        case WSMessage.ENTER_ROOM_FAILURE: {
          // clear timeout
          clearTimeout(retryMap[socket.websocketID][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocketID];
          setRetryMap(tempMap);
          // setRetry(initRetry);
          Alert.alert("Can't access chatroom. Check your connection");
          break;
        }
        default: {
          break;
        }
      }
    },
  });
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  const isLogined = !!useShallowSelector((state) => state.user.accessToken);

  const isChattingButtonDisabled =
    !isLogined || orderStatus.progress_status > ArticleStatus.Dealing;

  const [writer, setWriter] = useState<IUserSimple>();

  const handleChattingButtonClick = (resendKey: string) => {
    if (orderStatus.progress_status <= ArticleStatus.Dealing) {
      // check if resend
      const resend = !(parseInt(resendKey) === -1);
      // set timeout and fix websocket appropriately
      const key = resend ? resendKey : `${DateTime.now()}`;
      const timeoutID = setTimeout(handleChattingButtonClick, 5000, key);
      const tempMap = retryMap;
      tempMap[key] = resend ? [timeoutID, tempMap[key][1] + 1] : [timeoutID, 1];
      setRetryMap(tempMap);

      if (retryMap[key][1] > 3) {
        console.log('RESET');
        clearTimeout(retryMap[key][0]);
        const tempMap = retryMap;
        delete tempMap[key];
        setRetryMap(tempMap);
      }
      // send websocket
      sendWsMessage({
        type: WSMessage.ENTER_ROOM,
        data: {
          room_id: article_id,
          user_id: currentUser?.id,
        },
        websocket_id: `${DateTime.now()}`,
      });
      // setRetry({websocketID: key, timeoutID: timeoutID, count: count})
    }
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
