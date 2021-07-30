import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { DateTime } from 'luxon';

import { useNavigation } from '@react-navigation/core';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { CursorFlatList } from '@/components';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { useCursorPagination } from '@/helpers/hooks';
import { AppRoutes } from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import { RootState } from '@/store';
import { IChatListSinglePreview } from '@/types/chat';
import { IUserDetail } from '@/types/user';

import ChattingBox from './ChattingBox';

interface IObject {
  [key: string]: [number, number, number]; // [timeoutID, retry count, articleID]
}

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

  const toggle = useSelector((state: RootState) => state.chat.toggleChatList);
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  useEffect(() => {
    getItems('first');
  }, [toggle]);

  const [retryMap, setRetryMap] = useState<IObject>({});
  const { sendWsMessage } = GatguWebsocket.useMessage<{
    type: string;
    data: number;
    websocket_id: string;
  }>({
    onmessage: (socket) => {
      switch (socket.type) {
        case WSMessage.ENTER_ROOM_SUCCESS: {
          // clear timeout
          clearTimeout(retryMap[socket.websocket_id][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocket_id];
          setRetryMap(tempMap);
          navigation.navigate('ChattingRoom', {
            screen: 'ChattingRoom',
            params: { id: retryMap[socket.websocket_id][2] },
          });
          break;
        }
        case WSMessage.ENTER_ROOM_FAILURE: {
          clearTimeout(retryMap[socket.websocket_id][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocket_id];
          setRetryMap(tempMap);
          Alert.alert("Can't access chatroom. Check your connection");
          break;
        }
        default: {
          break;
        }
      }
    },
  });
  const navigateToChatRoom = (resendKey: string, articleID: number) => {
    // check if resend
    const resend = !(parseInt(resendKey) === -1);
    // set timeout and fix websocket appropriately
    const key = resend ? resendKey : `${DateTime.now()}`;
    const timeoutID = setTimeout(navigateToChatRoom, 5000, key, articleID);
    const tempMap = retryMap;
    tempMap[key] = resend
      ? [timeoutID, tempMap[key][1] + 1, articleID]
      : [timeoutID, 1, articleID];
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
        room_id: articleID,
        user_id: currentUser?.id,
      },
      websocket_id: `${DateTime.now()}`,
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
    // fix design: rendering infinitely many, even though list has ended
    // inside CursorFlatList
    // const handleEndReached = (info: {distanceFromEnd: number}) => {
    //   console.log('handle', info)
    //   // () => getItems('next')
    // }
    <View>
      <CursorFlatList
        items={items}
        isFirstPage={isFirstPage}
        renderItem={renderItem}
        getItems={getItems}
        fetching={fetching}
        horizontal={false}
        ListEmptyComponent={<Text>Empty...</Text>}
      />
    </View>
  );
}

export default ChattingList;
