import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DateTime } from 'luxon';
import { Image } from 'native-base';

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
  const { message, repeat, websocket_id, pending } = current;
  const { text, image, type, sent_at, sent_by } = message;
  const nextItem = next?.message; // because chat is in inversed
  const prevItem = previous?.message;

  const system = type === 'system' ? true : false;

  const isSameUser = sent_by?.id === prevItem?.sent_by?.id;

  const isSelf = selfId === sent_by?.id;
  const isSameTime =
    nextItem?.sent_at &&
    DateTime.fromMillis(sent_at).toFormat('hh:mm') ===
      DateTime.fromMillis(nextItem?.sent_at).toFormat('hh:mm') &&
    (nextItem?.type == 'system') === false &&
    sent_by.id === nextItem?.sent_by.id;

  // 00:00 format
  const sentTime = useMemo(() => {
    return sent_at ? DateTime.fromMillis(sent_at).toFormat('hh:mm') : '';
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
        {!isSameTime && !pending && (
          <Text style={ChatContainerStyle.timeText}>{sentTime}</Text>
        )}
        {/* <Text>{sent_at}, {nextItem?.sent_at}, {index}</Text> */}
        <View>
          {text && text.length != 0 ? (
            <View style={!isSelf && { paddingRight: 10 }}>
              <Bubble message={text} isSelf={isSelf} />
            </View>
          ) : null}
          {image.length > 0 && image[0].img_url !== emptyURL && (
            <Image
              source={{ uri: image[0].img_url }}
              style={styles.messageImage}
              fallbackSource={require('@/assets/images/defaultThumnail.png')}
              alt="pic"
            />
          )}
        </View>
      </View>
    ),
    [isSelf, isSameTime, text, sentTime, image]
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
          source={
            sent_by?.picture
              ? { uri: !isSameUser ? sent_by?.picture : undefined }
              : require('@/assets/images/defaultProfile.png')
          }
          style={styles.avatar}
          fallbackSource={require('@/assets/images/defaultProfile.png')}
          alt="profile pic"
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
        <View style={{}}>
          {renderedName}
          <View
            style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}
          >
            {renderedBubbleTime}
            {pending && (
              <View style={{ marginRight: 8, marginBottom: 3 }}>
                <ActivityIndicator size={'small'} />
              </View>
            )}
            {repeat ? (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() =>
                    resend(
                      { text: text, imgUrl: image[0].img_url },
                      `${websocket_id}`
                    )
                  }
                >
                  <FAIcon name="repeat" size={13} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => erase(`${websocket_id}`)}>
                  <MCIcon name="delete" size={16} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

export default React.memo(ChatBox);
