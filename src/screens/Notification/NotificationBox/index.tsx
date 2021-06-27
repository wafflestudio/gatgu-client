import React from 'react';
import { View, Text } from 'react-native';

import { InfoContainer, Thumbnail } from '@/components';

import styles from './NotificationBox.style';

// noticeType에 따라 다른 함수를 리턴해줌.
const noticeTemplate: {
  [x: string]: (title: string, user: string) => string;
} = {
  DeadLine: (title: string, user: string) =>
    `${user}님이 "${title}" 글에 채팅을 요청했습니다`,
};

function NotificationBox({ item }: { item: any }): JSX.Element {
  return (
    <InfoContainer>
      <Thumbnail uri={item.uri} w={64} h={64} style={styles.thunmnail} />
      <View style={styles.textWrapper}>
        <Text style={styles.Head}>
          {noticeTemplate[item.noticeType](item.title, item.user)}
        </Text>
        <Text style={styles.description}>{item.time}시간 전</Text>
      </View>
    </InfoContainer>
  );
}

export default NotificationBox;
