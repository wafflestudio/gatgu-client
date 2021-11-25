import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { View } from 'native-base';

import { chatAPI } from '@/apis';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { storeRecentlyReadMessageId } from '@/helpers/functions/chat';
import { useUserDetail } from '@/helpers/hooks/api';
import { refetchChattingList } from '@/store/chatSlice';
import { IChatMessage, IMessageImage } from '@/types/chat';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

export interface IWSChatMessage {
  message: IChatMessage;
  websocket_id?: string;
  repeat: boolean;
  pending: boolean;
}

function ChattingRoom({
  roomID,
  author_id,
}: {
  roomID: number;
  author_id: number;
}): JSX.Element {
  const dispatch = useDispatch();
  const currentUser = useUserDetail().data;

  const isRecentMsgStoredRef = React.useRef(false);

  const userID = currentUser?.id;
  const [fetchingMessages, setFetchingMessages] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(true);

  const [input, setInput] = useState<IMessageImage>({
    text: '',
    imgUrl: emptyURL,
  });

  const [chatList, setChatList] = useState<IWSChatMessage[]>([]);
  const [pendingList, setPendingList] = useState<IWSChatMessage[]>([]);

  const [nextCursor, setCursor] = useState<string | null>();

  //
  // for style
  //
  const [isKeyboardShown, setKeyboardShown] = React.useState(true);

  const getChattingMessages = React.useCallback(
    (option: string | null | undefined) => {
      setFetchingMessages(true);

      chatAPI
        .getChattingMessages(roomID, option)
        .then((chattingList) => {
          setCursor(chattingList.data.next);

          const chats = chattingList.data.results.map((chat) => ({
            message: chat,
            repeat: false,
            pending: false,
          }));

          setChatList((prev) => [...prev, ...chats]);
        })
        .finally(() => setFetchingMessages(false));
    },
    [roomID]
  );

  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (socket) => {
      if (
        socket.type === WSMessage.RECEIVE_MESSAGE_SUCCESS &&
        !socket.data.text.includes('entered')
      ) {
        // check if there is this message in chatList
        setChatList((prev) => [
          { message: socket.data, repeat: false, pending: false },
          ...prev,
        ]);
      }
    },
  });

  useEffect(() => {
    getChattingMessages('first');

    const handleKeyboardShown = () => setKeyboardShown(true);
    const handleKeyboardHide = () => setKeyboardShown(false);

    Keyboard.addListener('keyboardDidShow', handleKeyboardHide);
    Keyboard.addListener('keyboardDidHide', handleKeyboardShown);

    return () => {
      setChatList([]);

      if (!Keyboard?.removeListener) return;

      Keyboard.removeListener('keyboardDidShow', handleKeyboardHide);
      Keyboard.removeListener('keyboardDidHide', handleKeyboardShown);
    };
    //eslint-disable-next-line
  }, []);

  //
  // store recently read message id for chatting list unread flag
  //
  React.useEffect(() => {
    if (isRecentMsgStoredRef.current) return;

    const lastMessageId = chatList[0]?.message.id;
    if (lastMessageId) {
      storeRecentlyReadMessageId(roomID, lastMessageId);
      isRecentMsgStoredRef.current = true;
    }
  }, [roomID, chatList]);

  const sendChatMessage = React.useCallback(
    (message: TWsMessage) => {
      return sendWsMessage(message, {
        resolveCondition: (data) =>
          data.type === WSMessage.RECEIVE_MESSAGE_SUCCESS,
        rejectCondition: (data) =>
          data.type === WSMessage.RECEIVE_MESSAGE_FAILURE,
      })
        .then((result) => {
          // add to chatList
          setChatList((prev) => [
            { message: result.data, repeat: false, pending: false },
            ...prev,
          ]);

          // remove from pendingList
          setPendingList((prev) =>
            prev.filter(
              (message) => message.websocket_id !== result.websocket_id
            )
          );

          // trigger chatting list update
          dispatch(refetchChattingList);
        })
        .catch((e) => {
          console.error('websocket message is failed', e);
          // mark delete or resend in pendingList
          setPendingList((prev) =>
            prev.map((chat) =>
              chat.websocket_id === e.websocket_id
                ? { ...chat, repeat: true, pending: false }
                : chat
            )
          );
        });
    },
    [dispatch, sendWsMessage]
  );

  const handleSendMessage = React.useCallback(
    (input: IMessageImage, resend: string) => {
      if (!currentUser) return;

      // reset input
      setInput({ text: '', imgUrl: emptyURL });

      const firstSend = parseInt(resend) === -1;
      const websocket_id = firstSend ? `${DateTime.now()}` : resend;

      const message = {
        message: {
          text: input.imgUrl === emptyURL ? input.text : '',
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
          },
          sent_at: Date.now(),
          system: false,
          type: 'non-system',
        },
        websocket_id: websocket_id,
        repeat: false,
        pending: true,
      };

      const isValidMessage = input.imgUrl !== emptyURL || input.text.length > 0;

      if (firstSend) {
        if (isValidMessage) {
          setPendingList((prev) => [message, ...prev]);
        }
      } else {
        // if resend --> set as repeat false
        const tempPendingList = pendingList.map((chat) =>
          chat.websocket_id === websocket_id ? { ...chat, repeat: false } : chat
        );

        setPendingList(tempPendingList);
        setRefresh(!refresh);
      }

      const wsMessage = {
        type: WSMessage.SEND_MESSAGE,
        data: {
          room_id: roomID,
          user_id: userID,
          message: {
            text: input.imgUrl === emptyURL ? input.text : '',
            image: input.imgUrl === emptyURL ? '' : input.imgUrl,
          },
        },
        websocket_id: websocket_id, // tempID used for internal purposes
      };

      sendChatMessage(wsMessage);
    },
    [currentUser, pendingList, refresh, userID, roomID, sendChatMessage]
  );

  const handleErase = React.useCallback((resend: string) => {
    setPendingList((prev) =>
      prev.filter((message) => message.websocket_id !== resend)
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IWSChatMessage; index: number }) => {
      const list = [...pendingList, ...chatList];

      return (
        <ChatBox
          current={item}
          previous={list[index + 1]}
          next={list[index - 1]}
          selfId={currentUser?.id}
          resend={handleSendMessage}
          erase={handleErase}
        />
      );
    },
    [pendingList, chatList, handleSendMessage, handleErase, currentUser?.id]
  );

  const handleEndReach = React.useCallback(() => {
    if (!nextCursor || fetchingMessages) return;
    getChattingMessages(nextCursor);
  }, [nextCursor, fetchingMessages, getChattingMessages]);

  const renderedFlatList = React.useMemo(() => {
    return (
      <FlatList
        inverted
        data={[...pendingList, ...chatList]}
        renderItem={renderItem}
        style={[
          styles.msgContainer,
          {
            width: '100%',
            flex: 1,
          },
        ].filter(Boolean)}
        keyExtractor={(_, ind) => `${ind}`}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.1}
      />
    );
  }, [pendingList, chatList]);

  // return renderedFlatList;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      {renderedFlatList}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          marginTop: 10,
        }}
        keyboardVerticalOffset={500}
      >
        <InputBar
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          id={currentUser?.id}
          article_id={roomID}
          author_id={author_id}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default ChattingRoom;
