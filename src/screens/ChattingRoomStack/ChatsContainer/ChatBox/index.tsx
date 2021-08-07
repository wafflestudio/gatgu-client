import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { emptyURL } from '@/constants/image';
import { IMessageImage } from '@/types/chat';

import { IWSChatMessage } from '..';
import ChatContainerStyle from '../ChatContainer.style';
import Bubble from './Bubble';
import styles from './ChatBox.style';
import SystemMessage from './SystemMessage';

interface IChatBoxProps {
  current: IWSChatMessage;
  previous?: IWSChatMessage;
  next?: IWSChatMessage;
  // user nickname that decide left,right posision
  selfId?: number;
  resend: (input: IMessageImage, resend: string) => void;
  erase: (resend: string) => void;
}

// one line of message
function ChatBox({
  current,
  previous,
  next,
  selfId,
  resend,
  erase,
}: IChatBoxProps): JSX.Element {
  const { message, repeat, websocket_id } = current;
  const { text, image, type, sent_at, sent_by } = message;
  const prevItem = previous?.message;
  const nextItem = next?.message;
  const system = type === 'system' ? true : false;

  const isSameUser = sent_by?.id === prevItem?.sent_by?.id;

  const isSelf = selfId === sent_by?.id;

  const isSameTime =
    sent_at === nextItem?.sent_at && (nextItem?.type == 'system') === false;

  // 00:00 format
  const sentTime = useMemo(() => {
    // const split = sent_at.split('T');
    return sent_at;
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
        {text.length != 0 ? <Bubble message={text} isSelf={isSelf} /> : null}
        {image.length > 0 && image[0].img_url !== emptyURL && (
          <Image
            source={{ uri: image[0].img_url }}
            style={styles.messageImage}
          />
        )}
      </View>
    ),
    [isSelf, isSameTime, text, sentTime]
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
    <SystemMessage message={text} previousSystem={prevItem?.type == 'system'} />
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
          {renderedBubbleTime}
          {repeat ? (
            <View>
              <TouchableOpacity
                onPress={() =>
                  resend(
                    { text: text, imgUrl: image[0].img_url },
                    `${websocket_id}`
                  )
                }
              >
                <FAIcon name="repeat" size={16} color="#00000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => erase(`${websocket_id}`)}>
                <MCIcon name="delete" size={16} color="#00000" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default ChatBox;
