import React from 'react';
import { View, Text } from 'react-native';

import { InfoContainer, Thumbnail } from '@/components';
import NotificationBoxStyle from './NotificationBox.style';
import { INotifyItem } from '@/types/Notification';

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
          {`쓰니님이 "${item.title}" 글에 채팅을 요청했습니다`}
        </Text>
        <Text style={NotificationBoxStyle.description}>{item.time}시간 전</Text>
      </View>
    </InfoContainer>
  );
}

export default NotificationBox;
