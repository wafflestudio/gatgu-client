import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { emptyURL } from '@/constants/image';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { refetchChattingList } from '@/store/chatSlice';
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
  const dispatch = useDispatch();
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
          sent_at: `${DateTime.now()}`,
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
      sendWsMessage(wsMessage)
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
        article_id={roomID}
      />
    </View>
  );
}

export default ChattingRoom;
