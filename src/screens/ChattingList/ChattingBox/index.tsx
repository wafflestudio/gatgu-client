import React from 'react';
import { View, Text } from 'react-native';

import { InfoContainer, Thumbnail } from '@/components';
import { IChattingRoom } from '@/types/chat';
import ChattingListStyles from './ChattingBox.style';

function ChattingBox({ item }: { item: IChattingRoom }) {
  return (
    <InfoContainer>
      <Thumbnail
        uri={item.uri}
        w={64}
        h={64}
        style={ChattingListStyles.thunmnail}
      />
      <View style={ChattingListStyles.textWrapper}>
        <View style={ChattingListStyles.writerTimeWrapper}>
          <Text style={ChattingListStyles.Head}>{item.nickName}</Text>
          <Text style={ChattingListStyles.description}>{item.time}시간 전</Text>
        </View>
        <View style={ChattingListStyles.Box}>
          <Text
            style={ChattingListStyles.Head}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {item.chat}
          </Text>
          <Text
            style={ChattingListStyles.description}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </InfoContainer>
  );
}

export default ChattingBox;
