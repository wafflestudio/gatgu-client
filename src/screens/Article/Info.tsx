import { Label, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Info.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';
import GoalTopBubbleBar from './GoalTopBubble/index';
import { IS_MONEY } from '@/constants/Enum';

// will change input type (left it because will probably need it afterwards)
function Info({
  location,
  current,
  need_type,
  people_count_min,
  price_min,
}: IArticleProps): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>거래 지역</Label>
        <Text style={{ ...typo.info }}>{location}</Text>
      </View>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>모집 인원</Label>
        <GoalTopBubbleBar
          current={current}
          goal={need_type === IS_MONEY ? price_min : people_count_min}
          type={need_type}
        />
      </View>
    </View>
  );
}
export default Info;
