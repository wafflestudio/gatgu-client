import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';

import { IChatMessage } from '@/types/chat';

import ChatContainerStyle from '../ChatContainer.style';
import Bubble from './Bubble/Bubble';
import styles from './ChatBox.style';
import SystemMessage from './SystemMessage/SystemMessage';

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
  const renderedBubbleTime = useMemo(
    () => (
      <View
        style={[
          { alignItems: 'flex-end' },
          isSelf ? styles.row : styles.row_reverse,
        ]}
      >
        {!isSameTime && (
          <Text style={ChatContainerStyle.timeText}>{sentTime}</Text>
        )}
        <Bubble message={message} isSelf={isSelf} />
      </View>
    ),
    [isSelf, isSameTime, message, sentTime]
  );

  const renderedName = useMemo(
    () =>
      !isSelf &&
      !isSameUser && (
        <View>
          <Text style={styles.nameText}>{sent_by?.nickname}</Text>
        </View>
      ),
    [sent_by, isSelf, isSameUser]
  );

  const renderedProfile = useMemo(
    () =>
      !isSelf && (
        <Image
          source={{ uri: !isSameUser ? sent_by?.picture : undefined }}
          style={styles.avatar}
        />
      ),
    [sent_by, isSameUser, isSelf]
  );

  return system ? (
    <SystemMessage message={message} previousSystem={previous?.system} />
  ) : (
    <View
      style={[
        isSelf ? styles.rightContainer : styles.leftContinaer,
        !isSameUser && styles.marginTop10,
      ]}
    >
      <View style={styles.row}>
        {renderedProfile}
        <View>
          {renderedName}
          {image.length ? (
            <Image source={{ uri: image }} style={styles.messageImage} />
          ) : (
            renderedBubbleTime
          )}
        </View>
      </View>
    </View>
  );
}

export default ChatBox;
