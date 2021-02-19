import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import styles from './ArticleBox.style';
import Thumbnail from '@/components/Thumbnail';
import GoalBar from './GoalBar';
import { IArticleSumProps } from '@/types/article';

function ArticleBox({
  id,
  title,
  dayLeft,
  goal,
  percent,
  created,
  location,
  uri,
  isMoney,
}: IArticleSumProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.postBox}
      onPress={() =>
        navigation.navigate('Article', {
          screen: 'ArticlePage',
          params: { id: id },
        })
      }
    >
      <Thumbnail uri={uri} w={107} h={107} />
      <View style={styles.articleBox}>
        <Text style={styles.Head}>{title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.description}>{created} · </Text>
          <Text style={styles.description}>{dayLeft} · </Text>
          <Text style={styles.description}>{location}</Text>
        </View>
        <GoalBar percent={percent} goal={goal} isMoney={isMoney} />
      </View>
    </TouchableOpacity>
  );
}

export default ArticleBox;
