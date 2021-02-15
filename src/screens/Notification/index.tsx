import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { InfoContainer, Thumbnail, Header } from '@/components';
import NotificationStyle from './Notification.style';

interface INotifyItem {
  uri: string;
  title: string;
  time: number;
}

const mockData: INotifyItem[] = [
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '물 들어올 때 노 젓자~',
    time: 1,
  },
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '프로틴 같이 사실 분 구해요~',
    time: 2,
  },
];

function Notification() {
  const renderItem = ({ item }: { item: INotifyItem }) => (
    <InfoContainer>
      <Thumbnail
        uri={item.uri}
        w={64}
        h={64}
        style={NotificationStyle.thunmnail}
      />
      <View style={NotificationStyle.textWrapper}>
        <Text style={NotificationStyle.Head}>
          {`쓰니님이 "${item.title}" 글에 채팅을 요청했습니다`}
        </Text>
        <Text style={NotificationStyle.description}>{item.time}시간 전</Text>
      </View>
    </InfoContainer>
  );

  return (
    <View>
      <Header title={'알림'} left={false} right={false} />
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(_, ind) => String(ind)}
      />
    </View>
  );
}

export default Notification;
