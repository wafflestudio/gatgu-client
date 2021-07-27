import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';

import { chatAPI } from '@/apis';
import { CursorFlatList } from '@/components';
import { useCursorPagination } from '@/helpers/hooks';
import { AppRoutes } from '@/helpers/routes';
import { IChatListSinglePreview } from '@/types/chat';

function ChattingList(): JSX.Element {
  const navigation = useNavigation();
  const {
    items,
    firstFetching,
    isFirstPage,
    isLastPage,
    fetching,
    getItems,
  } = useCursorPagination<IChatListSinglePreview>({
    fetchFunc: chatAPI.getMyChattingList,
  });

  useEffect(() => {
    getItems('first');
  }, []);

  const renderItem = ({ item }: { item: IChatListSinglePreview }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('ChattingRoom', {
            screen: 'ChattingRoom',
            params: {
              id: item.id,
            },
          });
        }}
      >
        <Text>{item.id}</Text>
      </TouchableHighlight>
    );
  };

  return (
    // fix design: rendering infinitely many, even though list has ended
    // inside CursorFlatList
    // const handleEndReached = (info: {distanceFromEnd: number}) => {
    //   console.log('handle', info)
    //   // () => getItems('next')
    // }
    <View>
      <CursorFlatList
        items={items}
        isFirstPage={isFirstPage}
        renderItem={renderItem}
        getItems={getItems}
        fetching={fetching}
        horizontal={false}
        ListEmptyComponent={<Text>Empty...</Text>}
      />
    </View>
  );
}

export default ChattingList;
