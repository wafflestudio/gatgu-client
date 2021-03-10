import React from 'react';
import { View, FlatList } from 'react-native';

import { IChatMessage } from '@/types/chat';

import ChatBox from './ChatBox';
import InputBar from './InputBar';
import styles from './ChatContainer.style';
import { mobile } from '@/helpers/mobile';

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
    <View
      style={{
        justifyContent: 'flex-end',
        height: mobile.height - 56,
      }}
    >
      <FlatList
        data={chatList}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
      />
      <InputBar />
    </View>
  );
}

export default ChattingRoom;
