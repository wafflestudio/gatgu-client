import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { IChatMessage } from '@/types/chat';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import ChatBoxStyle from './ChatBox.style';
import ChatContainerStyle from '../ChatContainer.style';

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

  const isSameTime = sent_at === next?.sent_at && next?.system === false;

  // 00:00 format
  const sentTime = useMemo(() => {
    const fullDate = new Date(sent_at);
    return `${fullDate.getHours()}:${fullDate.getMinutes()}`;
  }, [sent_at]);

  // message + time
  const renderedBubbleTime = (
    <View
      style={[
        { alignItems: 'flex-end' },
        isSelf ? ChatBoxStyle.row : ChatBoxStyle.row_reverse,
      ]}
    >
      {!isSameTime && (
        <Text style={ChatContainerStyle.timeText}>{sentTime}</Text>
      )}
      <Bubble message={message} isSelf={isSelf} />
    </View>
  );

  const renderedName = !isSelf && !isSameUser && (
    <View>
      <Text style={ChatBoxStyle.nameText}>{sent_by?.nickname}</Text>
    </View>
  );

  const renderedProfile = !isSelf && (
    <Image
      source={{ uri: !isSameUser ? sent_by?.picture : undefined }}
      style={ChatBoxStyle.avatar}
    ></Image>
  );

  return system ? (
    <SystemMessage message={message} previousSystem={previous?.system} />
  ) : (
    <View
      style={[
        isSelf ? ChatBoxStyle.rightContainer : ChatBoxStyle.leftContinaer,
        !isSameUser && ChatBoxStyle.marginTop10,
      ]}
    >
      <View style={ChatBoxStyle.row}>
        {renderedProfile}
        <View>
          {renderedName}
          {image.length ? (
            <Image source={{ uri: image }} style={ChatBoxStyle.messageImage} />
          ) : (
            renderedBubbleTime
          )}
        </View>
      </View>
    </View>
  );
}

export default ChatBox;
