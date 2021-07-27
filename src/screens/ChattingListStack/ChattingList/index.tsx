import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/core';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { CursorFlatList } from '@/components';
import StartEndFlatList from '@/components/StartEndFlatList/StartEndFlatList';
import { useCursorPagination } from '@/helpers/hooks';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import {
  IChatListAllPreview,
  IChatListSinglePreview,
  IChattingRoom,
} from '@/types/chat';
import { IUserDetail } from '@/types/user';

import ChattingBox from './ChattingBox';

// const mockData: IChattingRoom[] = [1];
const mockData = [1];
function ChattingList(): JSX.Element {
  // const renderItem = ({ item }: { item: IChattingRoom }) => (
  //   <ChattingBox item={item} />
  // );

  const navigation = useNavigation();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
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
          navigation.navigate(AppRoutes.ChattingRoomStack);
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
