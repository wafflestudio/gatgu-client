import React, { useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';

import { Box } from 'native-base';

import BackIcon from '@/assets/icons/BackIcon/BackIcon.svg';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import NotificationBox, { INotificationBoxProps } from './NotificationBox';

const mockData = [
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '물 들어올 때 노 젓자~',
    time: 1,
    noticeType: 'DeadLine',
    user: '쓰니',
  },
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '프로틴 같이 사실 분 구해요~',
    time: 2,
    noticeType: 'DeadLine',
    user: '하이하이',
  },
];

function Notification(): JSX.Element {
  const navigation = useAppNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box
          pl="20px"
          onTouchEnd={() => {
            navigation.goBack();
          }}
        >
          <BackIcon />
        </Box>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: INotificationBoxProps }) => (
    <NotificationBox {...item} />
  );

  return (
    <View>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(_, ind) => String(ind)}
      />
    </View>
  );
}

export default Notification;
