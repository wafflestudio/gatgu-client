import React from 'react';
import { View, FlatList } from 'react-native';
import { IChatMessage } from '@/types/chat';
import ChatBox from './ChatBox';
interface IChattingRoomInterface {
  chatList: IChatMessage[];
}

function ChattingRoom({ chatList }: IChattingRoomInterface): JSX.Element {
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
      selfNickname="heesu"
    />
  );
  return (
    <View>
      <FlatList data={chatList} renderItem={renderItem} />
    </View>
  );
}

export default ChattingRoom;
