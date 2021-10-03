import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DateTime } from 'luxon';
import { Flex, Image } from 'native-base';

import { GSpace } from '@/components/Gatgu';
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
  const renderedBubbleTime = useMemo(() => {
    const isImageShown = image.length > 0 && image[0].img_url !== emptyURL;

    return (
      <View
        style={[
          { alignItems: 'flex-end' },
          isSelf ? styles.row : styles.row_reverse,
        ]}
      >
        {!isSameTime && !pending && (
          <Text style={ChatContainerStyle.timeText}>{sentTime}</Text>
        )}
        <View>
          {isImageShown ? (
            <Image
              source={{ uri: image[0].img_url }}
              style={styles.messageImage}
              fallbackSource={require('@/assets/images/defaultThumnail.png')}
              alt="pic"
            />
          ) : (
            <View style={!isSelf && { paddingRight: 10 }}>
              <Bubble message={text} isSelf={isSelf} />
            </View>
          )}
        </View>
      </View>
    );
  }, [isSelf, isSameTime, text, sentTime, image]);

  // 카카오톡과 동일함
  const isProfileShown = !(isSelf || (isSameUser && isSameTime));

  const renderedName = useMemo(
    () =>
      isProfileShown && (
        <View>
          <Text style={styles.nameText}>{sent_by?.nickname}</Text>
        </View>
      ),
    [sent_by, isProfileShown]
  );

  const renderedProfile = useMemo(
    () =>
      isProfileShown ? (
        <>
          <Image
            source={
              sent_by?.picture
                ? { uri: sent_by?.picture }
                : require('@/assets/images/defaultProfile.png')
            }
            style={[styles.avatar, { marginBottom: 10 }]}
            fallbackSource={require('@/assets/images/defaultProfile.png')}
            alt="profile pic"
          />
        </>
      ) : (
        <View style={styles.avatar} />
      ),
    [sent_by, isProfileShown]
  );

  const renderResendIcons = () => {
    if (!repeat) return;

    return (
      <Flex direction="row" align="center">
        <TouchableOpacity
          onPress={() =>
            resend({ text: text, imgUrl: image[0].img_url }, `${websocket_id}`)
          }
        >
          <FAIcon name="repeat" size={13} />
        </TouchableOpacity>
        <GSpace w={5} />
        <TouchableOpacity onPress={() => erase(`${websocket_id}`)}>
          <MCIcon name="delete" size={16} />
        </TouchableOpacity>
      </Flex>
    );
  };

  return system ? (
    <SystemMessage message={text} />
  ) : (
    <View
      style={[
        isSelf ? styles.rightContainer : styles.leftContinaer,
        !isSameUser && styles.marginTop10,
      ]}
    >
      <View style={styles.row}>
        {renderedProfile}
        <View
          style={
            isProfileShown && {
              marginTop: 15,
              alignItems: 'flex-start',
            }
          }
        >
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
            {renderResendIcons()}
          </View>
        </View>
      </View>
    </View>
  );
}

export default React.memo(ChatBox);
