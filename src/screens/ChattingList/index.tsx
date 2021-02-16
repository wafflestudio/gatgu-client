import React from 'react';
import { View, FlatList } from 'react-native';

import { IChattingRoom } from '@/types/chat';
import ChattingBox from './ChattingBox';

const mockData: IChattingRoom[] = [
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '물 들어올 때 노 젓자~',
    time: 1,
    chat: '이것은 채팅 내용입니다. 이것은 채팅 내용입니다.',
    nickName: '현수',
  },
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '프로틴 같이 사실 분 구해요~',
    time: 2,
    chat:
      '이것은 채팅 내용입니다. 이것은 채팅 내용입니다.이것은 채팅 내용입니다.',
    nickName: '현민',
  },
  {
    uri:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe6%2F24%2F6b%2Fe6246b2b4032b3d26d8ca49d49001694.jpg&type=ofullfill340_600',
    title: '나나나나나나나ㅏ나낭나러ㅏㄴ어ㅏㅇ너ㅏ',
    time: 10,
    chat: '이것은 채팅내 용입니다. 이것은 caksdk입니다.이것은 채팅내 용입니다.',
    nickName: '희수',
  },
];

function ChattingListTemplate(): JSX.Element {
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

export default ChattingListTemplate;
