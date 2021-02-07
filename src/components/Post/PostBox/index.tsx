import React from 'react';
import { View } from 'react-native';
import { CardItem, Text } from 'native-base';

import styles from './style';

import Thumbnail from '../Thumbnail';

export interface IPostProps {
  title: string;
  dayLeft: string;
  gatherLeft: string;
  location: string;
  uri: string;
}

export default function PostBox({
  title,
  dayLeft,
  gatherLeft,
  location,
  uri,
}: IPostProps) {
  return (
    <View style={styles.outerBox}>
      <CardItem style={styles.innerBox} button onPress={() => alert('not yet')}>
        <Thumbnail uri={uri} flex={1} />
        <View style={styles.articleBox}>
          <Text style={styles.Head}>{title}</Text>
          <Text style={styles.description}>{dayLeft}</Text>
          <View style={styles.subArticle3}>
            <Text style={styles.description}>{gatherLeft}</Text>
            <Text style={styles.description}>{location}</Text>
          </View>
        </View>
      </CardItem>
    </View>
  );
}
