import React from 'react';
import { View, Text, Image } from 'react-native';
import { IChatMessage } from '@/types/chat';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import ChatBoxStyle from './ChatBox.style';

interface IChatBoxProps {
  current: IChatMessage;
  previous?: IChatMessage;
  next?: IChatMessage;

  // user nickname that decide left,right posision
  selfNickname: string;
}

// one line of message

function ChatBox({
  current,
  previous,
  next,
  selfNickname,
}: IChatBoxProps): JSX.Element {
  const { message, system, sent_at, image, sent_by } = current;

  const isSameUser = sent_by?.nickname === previous?.sent_by?.nickname;
  const isSelf = selfNickname === sent_by?.nickname;
  const isSameTime = sent_at === next?.sent_at;

  return system ? (
    <SystemMessage message={message} />
  ) : (
    <View
      style={isSelf ? ChatBoxStyle.rightContainer : ChatBoxStyle.leftContinaer}
    >
      <View>{isSameUser && sent_by?.picture}</View>
      <View>
        <View>{sent_by?.nickname}</View>
      </View>
      {image.length ? (
        <Image source={require(image)} />
      ) : (
        <View>
          <Bubble message={message} isSelf={isSelf} />
          {isSameTime && <Text>{sent_at}</Text>}
        </View>
      )}
    </View>
  );
}

export default ChatBox;
