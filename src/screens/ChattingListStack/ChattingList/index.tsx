import React, { useEffect } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { DateTime } from 'luxon';

import { useNavigation } from '@react-navigation/core';

import { chatAPI } from '@/apis';
import { CursorFlatList } from '@/components';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { useCursorPagination } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { RootState } from '@/store';
import { IChatListSinglePreview } from '@/types/chat';

import ChattingBox from './ChattingBox';

function ChattingList(): JSX.Element {
  const navigation = useNavigation();
  const {
    items,
    firstFetching,
    isFirstPage,
    isLastPage,
    fetching,
    getItems,
  } = useCursorPagination<IChatListSinglePreview>({
    fetchFunc: chatAPI.getMyChattingList,
  });
  const { sendWsMessage } = GatguWebsocket.useMessage();

  const toggle = useSelector((state: RootState) => state.chat.toggleChatList);
  const currentUser = useUserDetail().data;

  useEffect(() => {
    getItems('first');
  }, [toggle]);

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
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, ind) => `${ind}`}
      />
    </View>
  );
}

export default ChattingList;
