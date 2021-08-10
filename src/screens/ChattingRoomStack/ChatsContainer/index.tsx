import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import _ from 'lodash';
import { DateTime } from 'luxon';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { useUserDetail } from '@/helpers/hooks/api';
import { refetchChattingList } from '@/store/chatSlice';
import { IChatMessage, IMessageImage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

export interface IWSChatMessage {
  message: IChatMessage;
  websocket_id?: string;
  repeat: boolean;
}

function ChattingRoom(): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const dispatch = useDispatch();
  const currentUser = useUserDetail().data;
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
          sent_at: Date.now(),
          system: false,
          type: 'non-system',
        },
        websocket_id: websocket_id,
        repeat: false,
      };
      if (firstSend) {
        const tempPendingList = pendingList;
        tempPendingList.push(message);
        setPendingList(tempPendingList);
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
      sendWsMessage(wsMessage, {
        resolveCondition: (data) =>
          data.type === WSMessage.RECEIVE_MESSAGE_SUCCESS,
        rejectCondition: (data) =>
          data.type === WSMessage.RECEIVE_MESSAGE_FAILURE,
      })
        .then((result) => {
          // add to chatList
          setChatList((prev) => [
            ...prev,
            { message: result.data, repeat: false },
          ]);

          // remove from pendingList
          setPendingList((prev) =>
            prev.filter(
              (message) => message.websocket_id !== result.websocket_id
            )
          );
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
    setPendingList((prev) =>
      prev.filter((message) => {
        return message.websocket_id !== resend;
      })
    );
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
