import React from 'react';
import { Text } from 'react-native';

import { View } from 'native-base';

import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';

import GoalTopBubbleBar from './GoalTopBubble/index';
import styles from './Info.style';

// will change input type (left it because will probably need it afterwards)
function Info({
  participants_summary,
  price_min,
  trading_place,
}: IArticleProps): JSX.Element {
  const current = participants_summary?.price ? participants_summary?.price : 0;
  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Text style={styles.label}>거래 지역</Text>
        <Text style={{ ...typo.info }}>{trading_place}</Text>
      </View>
      <View style={styles.subConNoBorder}>
        <Text style={styles.label}>모집 금액</Text>
        <GoalTopBubbleBar
          summary={participants_summary}
          current={current}
          min_required={price_min}
        />
      </View>
    </View>
  );
}
export default Info;
