import React from 'react';
import { View, Text } from 'react-native';

import { Image } from 'native-base';

import { InfoContainer } from '@/components';

import styles from './NotificationBox.style';

// noticeType에 따라 다른 함수를 리턴해줌.
const noticeTemplate: {
  [x: string]: (title: string, user: string) => string;
} = {
  DeadLine: (title: string, user: string) =>
    `${user}님이 "${title}" 글에 채팅을 요청했습니다`,
};

export interface INotificationBoxProps {
  uri: string;
  title: string;
  user: string;
  time: number;
  noticeType: string;
}

const NotificationBox: React.FC<INotificationBoxProps> = ({
  uri,
  noticeType,
  title,
  user,
  time,
}) => {
  return (
    <InfoContainer>
      <Image
        source={{ uri }}
        w="64px"
        h="64px"
        alt={noticeType}
        style={styles.thunmnail}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.Head}>
          {noticeTemplate[noticeType](title, user)}
        </Text>
        <Text style={styles.description}>{time}시간 전</Text>
      </View>
    </InfoContainer>
  );
};

export default NotificationBox;
