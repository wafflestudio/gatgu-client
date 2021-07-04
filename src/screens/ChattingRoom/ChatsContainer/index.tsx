import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useQuery } from 'react-query';

import { getMyData } from '@/apis/UserApi';
import { mobile } from '@/helpers/mobile';
import { USER_DETAIL } from '@/queryKeys';
import { IChatMessage } from '@/types/chat';
import { IUserDetail } from '@/types/user';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

interface IChattingRoomInterface {
  chatList: IChatMessage[];
  handleSend: (newMessage: string) => Promise<void>;
}

function ChattingRoom({
  chatList,
  handleSend,
}: IChattingRoomInterface): JSX.Element {
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

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
      selfId={`${currentUser?.id}`}
    />
  );
  return (
    <View
      style={{
        justifyContent: 'flex-end',
      }}
    >
      <FlatList
        data={chatList}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
      />
      <InputBar handleSend={handleSend} />
    </View>
  );
}

export default ChattingRoom;
