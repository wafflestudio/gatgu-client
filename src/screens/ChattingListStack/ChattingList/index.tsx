import React from 'react';
import { Alert, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { DateTime } from 'luxon';

import { useFocusEffect, useNavigation } from '@react-navigation/core';

import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { useSelector } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { IChatListSinglePreview } from '@/types/chat';

import useChattingRoomList from '../hooks/useChattingRoomList';
import ChattingBox from './ChattingBox';

function ChattingList(): JSX.Element {
  const navigation = useNavigation();
  const isLogined = useSelector((state) => state.user.isLogined);

  const { items, updateChattingRoomList } = useChattingRoomList();

  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (msg) => {
      console.log(msg);
      if (msg.type === WSMessage.RECEIVE_MESSAGE_SUCCESS) {
        updateChattingRoomList();
        console.log('__\nupdated\n__');
      }
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogined) return;

      updateChattingRoomList();
    }, [isLogined, updateChattingRoomList])
  );

  const currentUser = useUserDetail().data;

  const navigateToChatRoom = (resendKey: string, articleID: number) => {
    // check if resend
    const isResent = parseInt(resendKey) !== -1;
    // set timeout and fix websocket appropriately
    const websocket_id = isResent ? resendKey : `${DateTime.now()}`;

    const wsMessage = {
      type: WSMessage.ENTER_ROOM,
      data: {
        room_id: articleID,
        user_id: currentUser?.id,
      },
      websocket_id: websocket_id,
    };
    sendWsMessage(wsMessage, {
      resolveCondition: (data) => data.type === WSMessage.ENTER_ROOM_SUCCESS,
      rejectCondition: (data) => data.type === WSMessage.ENTER_ROOM_FAILURE,
    })
      .then(() => {
        if (articleID) {
          navigation.navigate('ChattingRoom', {
            screen: 'ChattingRoom',
            params: { id: articleID },
          });
        }
      })
      .catch(() => {
        Alert.alert("Can't access chatroom. Check your connection.");
      });
  };

  const renderItem = ({ item }: { item: IChatListSinglePreview }) => {
    return (
      <TouchableHighlight onPress={() => navigateToChatRoom('-1', item.id)}>
        <ChattingBox item={item} />
      </TouchableHighlight>
    );
  };
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(_, ind) => `${ind}`}
    />
  );
}

export default ChattingList;
