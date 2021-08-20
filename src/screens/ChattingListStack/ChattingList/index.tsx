import React from 'react';
import { FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { DateTime } from 'luxon';

import { useFocusEffect, useNavigation } from '@react-navigation/core';

import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { useSelector, useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { IChatListSinglePreview } from '@/types/chat';

import useChattingRoomList from '../hooks/useChattingRoomList';
import ChattingBox from './ChattingBox';
import ChattingListShimmer, {
  ChattingBoxShimmer,
} from './ChattingListShimmer/ChattingListShimmer';

function ChattingList(): JSX.Element {
  const navigation = useNavigation();

  const toaster = useToaster();

  const isLogined = useSelector((state) => state.user.isLogined);

  const {
    items,
    updateChattingRoomList,
    isLoading,
    setLoading,
  } = useChattingRoomList();

  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (msg) => {
      if (msg.type === WSMessage.RECEIVE_MESSAGE_SUCCESS) {
        updateChattingRoomList();
      }
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogined) return;

      updateChattingRoomList();

      return () => {
        setLoading(true);
      };
      // eslint-disable-next-line
    }, [isLogined])
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
      .catch((e) => {
        toaster.error(
          '채팅방에 입장하지 못 했습니다. 네트워크 연결을 다시 확인해주세요.'
        );
        console.error('ChattingList/index.tsx', e);
      });
  };

  const renderItem = ({ item }: { item: IChatListSinglePreview }) => {
    return (
      <TouchableHighlight onPress={() => navigateToChatRoom('-1', item.id)}>
        <ChattingBox item={item} />
      </TouchableHighlight>
    );
  };

  if (isLoading) return <ChattingListShimmer />;

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(_, ind) => `${ind}`}
      onEndReached={() => updateChattingRoomList('next')}
      onEndReachedThreshold={0.3}
      ListFooterComponent={<ChattingBoxShimmer />}
    />
  );
}

export default ChattingList;
