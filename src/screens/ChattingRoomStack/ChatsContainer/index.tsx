import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { useDispatch } from 'react-redux';

import _ from 'lodash';
import { DateTime } from 'luxon';
import { KeyboardAvoidingView } from 'native-base';

import { chatAPI } from '@/apis';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import { APItype } from '@/enums/image';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { storeRecentlyReadMessageId } from '@/helpers/functions/chat';
import { useUserDetail } from '@/helpers/hooks/api';
import useImageUpload from '@/helpers/hooks/useImageUpload';
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
  headerHeight,
}: {
  roomID: number;
  headerHeight: number;
}): JSX.Element {
  const dispatch = useDispatch();
  const currentUser = useUserDetail().data;
  const userID = currentUser?.id;
  const { uploadSingleImage } = useImageUpload(APItype.chat, userID);
  const [nextCursor, setCursor] = useState<string | null>();
  const [fetchingMessages, setFetchingMessages] = useState<boolean>(false);
  const [chatList, setChatList] = useState<IWSChatMessage[]>([]);
  const [pendingList, setPendingList] = useState<IWSChatMessage[]>([]);
  const [input, setInput] = useState<IMessageImage>({
    text: '',
    imgUrl: emptyURL,
  } as IMessageImage);
  const [refresh, setRefresh] = useState(true);
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [firstNextCursor, setFirstNextCursor] = useState<string | null>(
    'cursor_not_empty'
  );

  const getChattingMessages = (option: string | null | undefined) => {
    setFetchingMessages(true);
    chatAPI
      .getChattingMessages(roomID, option)
      .then((chattingList) => {
        const temp = chattingList.data.results;
        // TODO: change with pagination
        if (option === 'first') setFirstNextCursor(chattingList.data.next);
        setCursor(chattingList.data.next);
        const tempChatList = temp.map((chat) => {
          return {
            message: chat,
            repeat: false,
            pending: false,
          } as IWSChatMessage;
        });
        setChatList((prev) => [...prev, ...tempChatList]);
      })
      .finally(() => setFetchingMessages(false));
  };
  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (socket) => {
      if (
        socket.type === WSMessage.RECEIVE_MESSAGE_SUCCESS &&
        !socket.data.text.includes('entered')
      ) {
        console.log('SYSTEM', socket.data.type, socket.data.id);
        // check if there is this message in chatList
        setChatList((prev) => [
          { message: socket.data, repeat: false, pending: false },
          ...prev,
        ]);

        storeRecentlyReadMessageId(roomID, socket.data?.id);
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
        pending: true,
      };
      if (firstSend) {
        const tempPendingList = pendingList;
        tempPendingList.unshift(message);
        setPendingList(tempPendingList);
      }
      setRefresh(!refresh);

      const checkImage =
        input.imgUrl !== emptyURL
          ? uploadSingleImage({
              mime: 'jpeg',
              path: input.imgUrl,
            })
          : new Promise<string>((resolve) => resolve(emptyURL));

      checkImage
        .then((img: any) => {
          // send websocket message to server
          const wsMessage = {
            type: WSMessage.SEND_MESSAGE,
            data: {
              room_id: roomID,
              user_id: userID,
              message: {
                text: input.imgUrl === emptyURL ? input.text : '',
                image: input.imgUrl === emptyURL ? '' : img,
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
                { message: result.data, repeat: false, pending: false },
                ...prev,
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
              setPendingList((prev) =>
                prev.map((chat) =>
                  chat.websocket_id === e.websocket_id
                    ? { ...chat, repeat: true, pending: false }
                    : chat
                )
              );
            });
        })
        .catch((e) => console.error('ERR', e));
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
    [pendingList, chatList]
  );
  const renderKey = useCallback((_, ind) => `${ind}`, []);

  const handleEndReach = () => {
    if (!nextCursor || fetchingMessages) return;
    getChattingMessages(nextCursor);
  };

  const hhh = useMemo(
    () =>
      Dimensions.get('window').height -
      headerHeight -
      getStatusBarHeight() -
      getBottomSpace(),
    [Dimensions, headerHeight, getStatusBarHeight, getBottomSpace]
  );
  const firstCursor = useMemo(() => {
    const HEIGHT = 37; // minimum height of ChatBox
    if (firstNextCursor) return true;
    if (chatList.length * HEIGHT > hhh - inputHeight) return true;
    else return false;
  }, [chatList]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      contentContainerStyle={{ height: hhh, width: '100%' }}
      keyboardVerticalOffset={20}
      enabled
    >
      <View
        style={{
          justifyContent: 'flex-start',
          height: hhh - inputHeight,
          position: 'absolute',
          top: 0,
          width: '100%',
          paddingBottom: 10,
        }}
      >
        <FlatList
          data={[...pendingList, ...chatList]}
          renderItem={renderItem}
          style={[styles.msgContainer]}
          keyExtractor={renderKey}
          extraData={refresh}
          inverted={true}
          contentContainerStyle={
            firstCursor ? {} : { flexGrow: 1, justifyContent: 'flex-end' }
          }
          onEndReached={handleEndReach}
          onEndReachedThreshold={0.1}
          ListHeaderComponentStyle={{ borderWidth: 10 }}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          height: inputHeight,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <InputBar
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          id={currentUser?.id}
          article_id={roomID}
          inputHeight={inputHeight}
          setInputHeight={setInputHeight}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChattingRoom;

{
  /* <View style={{ justifyContent: 'flex-end', backgroundColor:'blue', }}> */
}
