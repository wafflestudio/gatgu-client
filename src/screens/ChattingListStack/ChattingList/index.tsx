import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';

import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { IChattingRoom } from '@/types/chat';

import ChattingBox from './ChattingBox';

// const mockData: IChattingRoom[] = [1];
const mockData = [1];
function ChattingList(): JSX.Element {
  // const renderItem = ({ item }: { item: IChattingRoom }) => (
  //   <ChattingBox item={item} />
  // );

  const navigation = useNavigation();

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
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(_, ind) => String(ind)}
      />
    </View>
  );
}

export default ChattingList;
