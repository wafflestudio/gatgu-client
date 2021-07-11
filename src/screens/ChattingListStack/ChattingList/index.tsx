import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/core';

import { getMyData } from '@/apis/UserApi';
import AppLoading from '@/components/AppLoading';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import { RootState } from '@/store';
import { getChattingList } from '@/store/chatSlice';
import { IChattingRoom } from '@/types/chat';
import { IUserDetail } from '@/types/user';

import ChattingBox from './ChattingBox';

// const mockData: IChattingRoom[] = [1];
const mockData = [1];
function ChattingList(): JSX.Element {
  // const renderItem = ({ item }: { item: IChattingRoom }) => (
  //   <ChattingBox item={item} />
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [, setErrno] = useState(-100);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  const chattingList = useSelector(
    (state: RootState) => state.chat.chattingList
  );
  const loading = useSelector(
    (state: RootState) => state.chat.chattingListIsLoading
  );
  const error = useSelector(
    (state: RootState) => state.chat.chattingListHasError
  );
  const errNumber = useSelector(
    (state: RootState) => state.chat.chattingListErrorStatus
  );

  useEffect(() => {
    if (currentUser) dispatch(getChattingList(currentUser.id));
  }, [dispatch]);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  useEffect(() => {
    setHasError(error);
  }, [error]);
  useEffect(() => {
    setErrno(errNumber);
  }, [errNumber]);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate(AppRoutes.ChattingRoomStack);
        }}
      >
        <Text>{item}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      {isLoading ? (
        <AppLoading />
      ) : hasError ? (
        <></>
      ) : (
        <FlatList
          data={chattingList}
          renderItem={renderItem}
          keyExtractor={(_, ind) => String(ind)}
        />
      )}
    </View>
  );
}

export default ChattingList;
