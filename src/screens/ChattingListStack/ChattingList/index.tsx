import React from 'react';
import { View, FlatList } from 'react-native';

import { IChattingRoom } from '@/types/chat';

import ChattingBox from './ChattingBox';

const mockData: IChattingRoom[] = [];

function ChattingList(): JSX.Element {
  const renderItem = ({ item }: { item: IChattingRoom }) => (
    <ChattingBox item={item} />
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

export default ChattingList;
