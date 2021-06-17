import React from 'react';
import { Text } from 'react-native';

import { Label, View } from 'native-base';

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
  const current = participants_summary?.price;

  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>거래 지역</Label>
        <Text style={{ ...typo.info }}>{trading_place}</Text>
      </View>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>모집 인원</Label>
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
