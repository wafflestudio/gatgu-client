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

  const { sendWsMessage } = GatguWebsocket.useMessage();

  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  const navigateToChatRoom = (resendKey: string) => {
    const resend = !(parseInt(resendKey) === -1);
    const websocket_id = resend ? resendKey : `${DateTime.now()}`;

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
          navigation.navigate('ChattingRoom', {
            screen: 'ChattingRoom',
            params: { id: article_id },
          });
          // trigger fetch to change store's participantsList -> affect chatting drawer
          if (result.data == 201) {
            dispatch(fetchingParticipants(article_id));
          }
        }
      })
      .catch((e) => {
        Alert.alert("Can't access chatroom. Check your connection");
      });
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
