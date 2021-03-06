import React from 'react';
import { View } from 'react-native';
import ChatsContainer from './ChatsContainer';
import messages from './mockChat';

export default function ChattingRoom(): JSX.Element {
  return (
    <View>
      <ChatsContainer chatList={messages} />
    </View>
  );
}
