import React from 'react';
import { View, Text } from 'react-native';

import { InfoContainer, Thumbnail } from '@/components';
import { INotifyItem, TnoticeType } from '@/types/Notification';

import NotificationBoxStyle from './NotificationBox.style';

// noticeType에 따라 다른 함수를 리턴해줌.
const noticeTemplate: {
  [k in TnoticeType]: (title: string, user: string) => string;
} = {
  DeadLine: (title: string, user: string) =>
    `${user}님이 "${title}" 글에 채팅을 요청했습니다`,
  ECT: (title: string, user: string) => ``,
};

function NotificationBox({ item }: { item: INotifyItem }): JSX.Element {
  return (
    <InfoContainer>
      <Thumbnail
        uri={item.uri}
        w={64}
        h={64}
        style={NotificationBoxStyle.thunmnail}
      />
      <View style={NotificationBoxStyle.textWrapper}>
        <Text style={NotificationBoxStyle.Head}>
          {noticeTemplate[item.noticeType](item.title, item.user)}
        </Text>
        <Text style={NotificationBoxStyle.description}>{item.time}시간 전</Text>
      </View>
    </InfoContainer>
  );
}

export default NotificationBox;
