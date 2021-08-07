import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import _ from 'lodash';
import { DateTime } from 'luxon';
import { Flex, Spinner } from 'native-base';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { CursorFlatList } from '@/components';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { USER_DETAIL } from '@/queryKeys';
import { refetchChattingList } from '@/store/chatSlice';
import {
  IAllMessagesResponse,
  IChatMessage,
  IMessageImage,
} from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IUserDetail } from '@/types/user';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

// import { ResendMessage } from '@/helpers/hooks/useResendMessage';

interface IChattingRetryMap {
  [key: string]: [number, number]; // [timeoutID, retry count]
}

export interface IWSChatMessage {
  message: IChatMessage;
  websocket_id?: string;
  repeat: boolean;
}

function ChattingRoom(): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const dispatch = useDispatch();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const userID = currentUser?.id;
  const roomID = route.params.id;
  const [nextCursor, setCursor] = useState<string | null>();
  const [fetchingMessages, setFetchingMessages] = useState<boolean>(false);
  const [chatList, setChatList] = useState<IWSChatMessage[]>([]);
  const [pendingList, setPendingList] = useState<IWSChatMessage[]>([]);
  const [input, setInput] = useState<IMessageImage>({
    text: '',
    imgUrl: emptyURL,
  } as IMessageImage);
  const [refresh, setRefresh] = useState(true);
  const getChattingMessages = (option: string | null | undefined) => {
    setFetchingMessages(true);
    chatAPI
      .getChattingMessages(roomID, option)
      .then((chattingList) => {
        // TODO: change with pagination
        setCursor(chattingList.data.next);
        const tempChatList = chattingList.data.results.map((chat) => {
          return {
            message: chat,
            repeat: false,
          };
        });
        setChatList((prev) => [...prev, ...tempChatList]);
      })
      .finally(() => setFetchingMessages(false));
  };
  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (socket) => {
      if (socket.type === WSMessage.RECEIVE_MESSAGE_SUCCESS) {
        getChattingMessages('next');
      }
    },
  });

  useEffect(() => {
    getChattingMessages('first');
  }, []);

  const handleSendMessage = (input: IMessageImage, resend: string) => {
    // reset input
    setInput({ text: '', imgUrl: emptyURL } as IMessageImage);

    if (currentUser) {
      const mockPendingList: IWSChatMessage[] = pendingList;
      const firstSend = parseInt(resend) === -1;
      const websocket_id = firstSend ? `${DateTime.now()}` : resend;

      // if resend --> set as repeat false
      if (!firstSend) {
        const tempPendingList = pendingList.map((chat) =>
          chat.websocket_id === websocket_id ? { ...chat, repeat: false } : chat
        );
        setPendingList(tempPendingList);
      }

      // add to pendingList
      const message = {
        message: {
          text: input.text,
          image: [
            {
              id: 0, // @juimdpp TODO
              img_url: input.imgUrl,
            },
          ],
          sent_by: {
            id: currentUser.id,
            nickname: currentUser.username,
            picture: currentUser.userprofile.picture,
            updated_at: 20210716,
            withdrew_at: null,
            // TODO: remove comments before pushing
            // updated_at: currentUser.userprofile.updated_at.getTime()/1000,
            // withdrew_at: currentUser.userprofile.withdrew_at.getTime()/1000
          },
          sent_at: `${DateTime.now()}`,
          system: false,
          type: 'non-system',
        },
        websocket_id: websocket_id,
        repeat: false,
      };
      if (firstSend) {
        mockPendingList.push(message);
        setPendingList(mockPendingList);
      }
      setRefresh(!refresh);

      // send websocket message to server
      const wsMessage = {
        type: WSMessage.SEND_MESSAGE,
        data: {
          room_id: roomID,
          user_id: userID,
          message: {
            text: input.text,
            image: input.imgUrl === emptyURL ? '' : input.imgUrl,
          },
        },
        websocket_id: websocket_id, // tempID used for internal purposes
      };
      sendWsMessage(wsMessage)
        .then((result) => {
          // add to chatList
          const tempChatList = chatList;
          tempChatList.push({
            message: result.data,
            repeat: false,
          });
          setChatList(tempChatList);

          // remove from pendingList
          let tempPendingList: IWSChatMessage[] = [];
          tempPendingList = pendingList.filter(
            (message) => message.websocket_id !== result.websocket_id
          );
          setPendingList(tempPendingList);
          setRefresh(!refresh);

          // trigger chatting list update
          dispatch(refetchChattingList);
        })
        .catch((e) => {
          // mark delete or resend in pendingList
          const tempPendingList = pendingList.map((chat) =>
            chat.websocket_id === e.websocket_id
              ? { ...chat, repeat: true }
              : chat
          );
          setPendingList(tempPendingList);
        });
    }
  };

  const handleErase = (resend: string) => {
    let tempPendingList: IWSChatMessage[] = [];
    tempPendingList = pendingList.filter((message) => {
      return message.websocket_id !== resend;
    });
    setPendingList(tempPendingList);
    setRefresh(!refresh);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IWSChatMessage;
    index: number;
  }) => (
    <ChatBox
      current={item}
      previous={chatList[index - 1]}
      next={chatList[index + 1]}
      selfId={currentUser?.id}
      resend={handleSendMessage}
      erase={handleErase}
    />
  );

  const handleEndReach = () => {
    if (!nextCursor || fetchingMessages) return;
    getChattingMessages(nextCursor);
  };

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: '93%',
      }}
    >
      {
        // (
        //   <Flex height="100%">
        //     <Spinner paddingTop="50%" />
        //   </Flex>
        // )
        <FlatList
          data={[...chatList, ...pendingList]}
          renderItem={renderItem}
          style={styles.msgContainer}
          keyExtractor={(_, ind) => `${ind}`}
          extraData={refresh}
          inverted={true}
          onEndReached={handleEndReach}
          onEndReachedThreshold={0.1}
          ListHeaderComponentStyle={{ borderWidth: 10 }}
        />
      }
      <InputBar
        input={input}
        setInput={setInput}
        handleSendMessage={() => handleSendMessage(input, '-1')}
        id={currentUser?.id}
        article_id={roomID}
      />
    </View>
  );
}

export default ChattingRoom;
