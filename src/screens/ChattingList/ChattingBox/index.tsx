import React from 'react';
import { View, Text } from 'react-native';

import { InfoContainer, Thumbnail } from '@/components';
import { IChattingRoom } from '@/types/chat';

import styles from './ChattingBox.style';

function ChattingBox({ item }: { item: IChattingRoom }): JSX.Element {
  return (
    <InfoContainer>
      <Thumbnail uri={item.uri} w={64} h={64} style={styles.thunmnail} />
      <View style={styles.textWrapper}>
        <View style={styles.writerTimeWrapper}>
          <Text style={styles.Head}>{item.nickName}</Text>
          <Text style={styles.description}>{item.time}시간 전</Text>
        </View>
        <View style={styles.Box}>
          <Text style={styles.Head} ellipsizeMode={'tail'} numberOfLines={1}>
            {item.chat}
          </Text>
          <Text
            style={styles.description}
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
