import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import styles from './ArticleBox.style';
import Thumbnail from '@/components/Thumbnail';
import GoalBar from './GoalBar';
import { IArticleSumProps } from '@/types/article';
import { remainTime, calcTimeDiff } from '@/helpers/functions/time';
import { IS_PEOPLE } from '@/constants/Enum';

function ArticleBox({
  article_id,
  title,
  time_in,
  price_min,
  people_min,
  written_at,
  location,
  thumbnail_url,
  need_type,
  participants_summary,
}: IArticleSumProps): JSX.Element {
  const navigation = useNavigation();

  const { diff: timeBefore, type: typeBefore } = calcTimeDiff(
    'current',
    written_at
  );

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
          <Text style={styles.description}>
            {`${timeBefore} ${typeBefore} 전`} ·{' '}
          </Text>
          <Text style={styles.description}>{remainTime(time_in)} · </Text>
          <Text style={styles.description}>{location}</Text>
        </View>
        <View style={styles.goalWrapper}>
          <GoalBar
            summary={participants_summary}
            min_required={need_type === IS_PEOPLE ? people_min : price_min}
            type={need_type}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ArticleBox;
