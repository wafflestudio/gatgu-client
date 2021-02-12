import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import styles from './style';

import Thumbnail from '../Thumbnail';
import GoalBar from './GoalBar';
import { IPostProps } from '@/types/post';

export default function PostBox({
  title,
  dayLeft,
  goal,
  percent,
  created,
  location,
  uri,
  money,
}: IPostProps) {
  return (
    <TouchableOpacity style={styles.postBox} onPress={() => alert('not yet')}>
      <Thumbnail uri={uri} w={107} h={107} />
      <View style={styles.articleBox}>
        <Text style={styles.Head}>{title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.description}>{created} · </Text>
          <Text style={styles.description}>{dayLeft} · </Text>
          <Text style={styles.description}>{location}</Text>
        </View>
        <GoalBar percent={percent} goal={goal} money={money} />
      </View>
    </TouchableOpacity>
  );
}
