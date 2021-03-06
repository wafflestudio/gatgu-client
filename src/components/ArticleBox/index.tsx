import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import styles from './ArticleBox.style';
import Thumbnail from '@/components/Thumbnail';
import GoalBar from './GoalBar';
import { IArticleSumProps } from '@/types/article';
import { remainTime } from '@/helpers/functions/time';

function ArticleBox({
  article_id,
  title,
  time_in,
  price_min,
  people_min,
  created_at,
  location,
  thumbnail_url,
  need_type,
  participnats_summary,
}: IArticleSumProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.postBox}
      onPress={() =>
        navigation.navigate('Article', {
          screen: 'ArticlePage',
          params: { id: article_id },
        })
      }
    >
      <Thumbnail uri={thumbnail_url} w={107} h={107} />
      <View style={styles.articleBox}>
        <Text style={styles.Head}>{title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.description}>{created_at} · </Text>
          <Text style={styles.description}>{remainTime(time_in)} · </Text>
          <Text style={styles.description}>{location}</Text>
        </View>
        <View style={styles.goalWrapper}>
          <GoalBar
            summary={participnats_summary}
            goal={{ price_min, people_min }}
            type={need_type}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ArticleBox;
