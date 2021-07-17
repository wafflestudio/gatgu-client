import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useQuery } from 'react-query';

import { DateTime } from 'luxon';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { IChatMessage, IReceivedMessage, ISendMessage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IUserDetail } from '@/types/user';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

function ChattingRoom(): JSX.Element {
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const userID = currentUser?.id;
  const roomID = route.params.id;

  const [chatList, setChatList] = useState<IChatMessage[]>([]);
  const [pendingList, setPendingList] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    chatAPI
      .getChattingMessages(roomID)
      .then((chattingList) => {
        // TODO: change with pagination
        setChatList(chattingList.data.results);
      })
      .catch((e) => {
        console.debug('GET CHATTING MESSAGES', e);
      });
  }, []);

  const handleSendMessage = () => {
    if (currentUser) {
      // add to pendingList
      const message = {
        text: input,
        image: [
          {
            id: 0, // @juimdpp TODO
            img_url: 'www.google.com',
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
        sent_at: DateTime.now().toSeconds(),
        system: false,
      };
      const tempPendingList = pendingList;
      tempPendingList.push(message);
      setPendingList(tempPendingList);
      setRefresh(!refresh);

      // send websocket message to server
      sendWsMessage({
        type: WSMessage.SEND_MESSAGE,
        data: {
          room_id: roomID,
          user_id: userID,
          message: {
            text: input,
            img: 'www.google.com',
          },
        } as ISendMessage,
      });

      // reset input
      setInput('');
    }
  };

  GatguWebsocket.useMessage<{
    type: string;
    data: IReceivedMessage;
  }>({
    onmessage: (socket) => {
      switch (socket.type) {
        case WSMessage.RECEIVE_MESSAGE_SUCCESS: {
          // add to chatList
          const tempChatList = chatList;
          tempChatList.push(socket.data);
          setChatList(tempChatList);

          // remove from pendingList
          const tempPendingList: IChatMessage[] = [];
          let seen = false;
          pendingList.forEach((message) => {
            // want better logic for filtering out THE sent message
            if (
              !seen &&
              message.text == socket.data.text &&
              message.image[0].img_url == socket.data.image[0].img_url
            ) {
              seen = true;
              return;
            }
            tempPendingList.push(message);
          });
          setPendingList(tempPendingList);
          setRefresh(!refresh);
          break;
        }
        default: {
          console.log('DEFAULT', socket);
          break;
        }
      }
    },
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: IChatMessage;
    index: number;
  }) => (
    <ChatBox
      current={item}
      previous={chatList[index - 1]}
      next={chatList[index + 1]}
      selfId={currentUser?.id}
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
        data={chatList}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
        extraData={refresh}
        ListHeaderComponentStyle={{ borderWidth: 10 }}
      />
      <FlatList
        data={pendingList}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
        extraData={refresh}
      />
      <InputBar
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
}

export default ChattingRoom;
