import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { Image } from 'native-base';

import { InfoContainer } from '@/components';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { OrderStatus } from '@/enums';
import { toUnix } from '@/helpers/functions/time';
import { IChatListSinglePreview, IChattingRoom } from '@/types/chat';

import styles from './ChattingBox.style';

const parseSysMsg = (msg: string): string => {
  let ret = '';
  switch (msg) {
    case 'exit_room':
      ret = '누군가가 나갔습니다';
      break;
    default:
      ret = 'SYSTEM';
  }
  return ret;
};

function ChattingBox({ item }: { item: IChatListSinglePreview }): JSX.Element {
  const { recent_message } = item;
  const { sent_by } = recent_message;
  const sent_at = useMemo(() => {
    return toUnix(recent_message?.sent_at);
  }, [recent_message]);
  console.log('SENT', sent_at);
  console.log('recent', recent_message);
  return (
    <InfoContainer>
      <Thumbnail uri={sent_by?.picture} />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.Head}>{sent_by?.nickname}</Text>
          <Text style={styles.timeWrapper}>{sent_at}시간 전</Text>
        </View>
        <View style={styles.Box}>
          <Text style={styles.Head} ellipsizeMode={'tail'} numberOfLines={1}>
            {recent_message.type == 'system'
              ? parseSysMsg(recent_message.text)
              : recent_message.text}
          </Text>
          <Text
            style={styles.description}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {OrderStatus[1]}
          </Text>
        </View>
      </View>
    </InfoContainer>
  );
}

export default ChattingBox;
