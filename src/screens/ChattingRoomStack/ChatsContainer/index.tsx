import React from 'react';
import { View, FlatList } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { IChatMessage } from '@/types/chat';

import ChatBox from './ChatBox';
import styles from './ChatContainer.style';
import InputBar from './InputBar';

interface IChattingRoomInterface {
  chatList: IChatMessage[];
  userID?: number;
  roomID: number;
}

function ChattingRoom({
  chatList,
  userID,
  roomID,
}: IChattingRoomInterface): JSX.Element {
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
      selfNickname="270"
    />
  );
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: mobile.height - 56,
      }}
    >
      <InputBar userID={userID} roomID={roomID} />
      <FlatList
        data={chatList}
        renderItem={renderItem}
        style={styles.msgContainer}
        keyExtractor={(_, ind) => `${ind}`}
      />
    </View>
  );
}

export default ChattingRoom;
