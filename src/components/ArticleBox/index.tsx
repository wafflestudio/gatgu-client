import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Thumbnail from '@/components/Thumbnail';
import { remainTime, calcTimeDiff } from '@/helpers/functions/time';
import { $thumnail_size } from '@/styles/size';
import { IArticleSummary } from '@/types/article';

import styles from './ArticleBox.style';

const ArticleBox: React.FC<IArticleSummary> = ({
  article_id,
  title,
  time_in,
  image,
}) => {
  const navigation = useNavigation();

  const { diff: timeBefore, type: typeBefore } = calcTimeDiff(
    'current',
    time_in
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
      <Thumbnail uri={image ?? ''} w={$thumnail_size} h={$thumnail_size} />
      <View style={styles.articleBox}>
        <Text style={styles.Head}>{title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.description}>
            {`${timeBefore} ${typeBefore} 전`} ·{' '}
          </Text>
          <Text style={styles.description}>{remainTime(time_in)} · </Text>
          <Text style={styles.description}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleBox;
