import { View } from 'native-base';
import React from 'react';
import styles from './GoalTopBubble.style';
import GoalBar from '@/components/ArticleBox/GoalBar';
import TopBubble from './TopBubble';

interface IGoalTopBubbleProps {
  current: number;
  goal: number;
  type: number;
}

function GoalTopBubble({
  current,
  goal,
  type,
}: IGoalTopBubbleProps): JSX.Element {
  const percent = (current / goal) * 100;
  const isMoney = type === 0 ? true : false;

  return (
    <View style={styles.containerBox}>
      <TopBubble current={current} goal={goal} type={type} />
      <View style={styles.goalWrapper}>
        <GoalBar
          percent={percent}
          goal={`${goal}${type === 0 ? '원' : '명'}`}
          isMoney={isMoney}
        />
      </View>
    </View>
  );
}
export default GoalTopBubble;
