import React, { useContext, useState } from 'react';
import { Alert, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { getMyData } from '@/apis/UserApi';
import { ArticleStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { fetchingParticipants } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';
import { IChatMessage } from '@/types/chat';
import { IUserDetail } from '@/types/user';

import styles from './Chat.style';

interface IChatProps {
  orderStatus: IArticleStatus;
  article_id: number | undefined;
}

interface IWsRetry {
  // websocketID: string;
  timeoutID: number;
  count: number;
}

interface IObject {
  [key: string]: [number, number]; // [timeoutID, retry count]
}

const initRetry = { timeoutID: -1, count: 0 } as IWsRetry;

function Chat({ article_id, orderStatus }: IChatProps): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [retryMap, setRetryMap] = useState<IObject>({});
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
            navigation.navigate('ChattingRoom', {
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

  const navigateToChatRoom = (resendKey: string) => {
    if (orderStatus.progress_status <= ArticleStatus.Dealing) {
      // check if resend
      const resend = !(parseInt(resendKey) === -1);
      // set timeout and fix websocket appropriately
      const key = resend ? resendKey : `${DateTime.now()}`;
      const timeoutID = setTimeout(navigateToChatRoom, 5000, key);
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

  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={() => navigateToChatRoom('-1')}>
        <View
          style={[
            styles.chattingButton,
            orderStatus.progress_status <= ArticleStatus.Dealing
              ? { backgroundColor: palette.blue, borderColor: palette.blue }
              : {
                  backgroundColor: palette.borderGray,
                  borderColor: palette.borderGray,
                },
          ]}
        >
          <Text style={styles.chattingText}>구매 채팅으로 가기</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
export default Chat;
