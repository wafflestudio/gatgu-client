import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from 'react-query';

import { DateTime } from 'luxon';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { IChatMessage, IMessageImage } from '@/types/chat';
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
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const userID = currentUser?.id;
  const roomID = route.params.id;

  const [chatList, setChatList] = useState<IWSChatMessage[]>([]);
  const [pendingList, setPendingList] = useState<IWSChatMessage[]>([]);
  const [retryMap, setRetryMap] = useState<IChattingRetryMap>({});
  const [input, setInput] = useState<IMessageImage>({
    text: '',
    imgUrl: emptyURL,
  } as IMessageImage);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    chatAPI
      .getChattingMessages(roomID)
      .then((chattingList) => {
        // TODO: change with pagination
        const tempChatList = chattingList.data.results.reverse().map((chat) => {
          return {
            message: chat,
            repeat: false,
          };
        });
        setChatList(tempChatList);
      })
      .catch((e) => {
        console.debug('GET CHATTING MESSAGES', e);
      });
  }, []);

  /**
   * resend: string representing key of retryMap to retrieve timeoutID
   *         -1 -> when sending message for first time
   *         0  -> resend upon clicking resend
   */
  const handleSendMessage = (input: IMessageImage, resend: string) => {
    if (currentUser) {
      let mockPendingList: IWSChatMessage[] = pendingList;
      const firstSend = parseInt(resend) === -1;
      // if resend
      if (!firstSend) {
        // delete message from pendingList
        mockPendingList = mockPendingList.filter((message) => {
          return message.websocket_id !== resend.slice(1);
        });
      }

      // set timeout
      const key = firstSend ? `${DateTime.now()}` : resend;
      const timeoutID = setTimeout(handleSendMessage, 2000, input, key);
      const tempMap = retryMap;
      tempMap[key] = firstSend
        ? [timeoutID, 1]
        : [timeoutID, tempMap[key][1] + 1];
      setRetryMap(tempMap);

      // if more than 5 retries
      if (retryMap[key][1] > 5) {
        // clear timeout
        clearTimeout(retryMap[key][0]);

        // mark delete or resend in pendingList
        const tempPendingList = mockPendingList.map((chat) =>
          chat.websocket_id === `${key}` ? { ...chat, repeat: true } : chat
        );
        setPendingList(tempPendingList);

        // delete from map
        const tempMap = retryMap;
        delete tempMap[key];
        setRetryMap(tempMap);
        setRefresh(!refresh);
        return;
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
        websocket_id: key,
        repeat: false,
      };
      if (firstSend) {
        mockPendingList.push(message);
        setPendingList(mockPendingList);
      }
      setRefresh(!refresh);

      // send websocket message to server
      sendWsMessage({
        type: WSMessage.SEND_MESSAGE,
        data: {
          room_id: roomID,
          user_id: userID,
          message: {
            text: input.text,
            image: input.imgUrl === '{' ? '' : input.imgUrl,
          },
        },
        websocket_id: key, // tempID used for internal purposes
      });

      // reset input
      setInput({} as IMessageImage);
    }
  };

  /*
  ## (SEND_MESSAGE)           : setTimeout + put to pendingList
  ## (RECEIVE_MESSAGE_SUCCESS): clearTimeout + add to chatList + remove from pendingList
  (RECEIVE_MESSAGE_FAILURE): clearTimeout + delete or resend
*/

  GatguWebsocket.useMessage<{
    type: string;
    data: IChatMessage;
    websocket_id: string;
  }>({
    onmessage: (socket) => {
      switch (socket.type) {
        case WSMessage.RECEIVE_MESSAGE_SUCCESS: {
          // add to chatList
          const tempChatList = chatList;
          tempChatList.push({
            message: socket.data,
            repeat: false,
          });
          setChatList(tempChatList);

          // remove from pendingList
          let tempPendingList: IWSChatMessage[] = [];
          tempPendingList = pendingList.filter(
            (message) => message.websocket_id !== socket.websocket_id
          );
          setPendingList(tempPendingList);
          setRefresh(!refresh);

          // clear timeout
          clearTimeout(retryMap[socket.websocket_id][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocket_id];
          setRetryMap(tempMap);
          break;
        }
        case WSMessage.RECEIVE_MESSAGE_FAILURE: {
          // clear timeout
          clearTimeout(retryMap[socket.websocket_id][0]);
          const tempMap = retryMap;
          delete tempMap[socket.websocket_id];
          setRetryMap(tempMap);

          // mark delete or resend in pendingList
          const tempPendingList = pendingList.map((chat) =>
            chat.websocket_id === socket.websocket_id
              ? { ...chat, repeat: true }
              : chat
          );
          setPendingList(tempPendingList);
          break;
        }
        default: {
          console.log('DEFAULT', socket);
          break;
        }
      }
    },
  });

  const handleErase = (resend: string) => {
    let tempPendingList: IWSChatMessage[] = [];
    tempPendingList = pendingList.filter((message) => {
      return message.websocket_id !== resend.slice(1);
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

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: '93%',
      }}
    >
      <FlatList
        data={[...chatList, ...pendingList]}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
        extraData={refresh}
        ListHeaderComponentStyle={{ borderWidth: 10 }}
      />
      <InputBar
        input={input}
        setInput={setInput}
        handleSendMessage={() => handleSendMessage(input, '-1')}
        id={currentUser?.id}
      />
    </View>
  );
}

export default ChattingRoom;
