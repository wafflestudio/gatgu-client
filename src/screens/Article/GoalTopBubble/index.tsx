import { View } from 'native-base';
import React, { useState } from 'react';
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
  const [end, setEnd] = useState<number>(0);
  const [pEnd, setPend] = useState<number>(0);

  const percent = (current / goal) * 100;
  const isMoney = type === 0 ? true : false;

  const getEnd = (event: any) => {
    setEnd(event.nativeEvent.layout.width);
  };
  const getPend = (event: any) => {
    setPend(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.containerBox}>
      <View style={styles.bubbleWrapper}>
        <TopBubble
          current={current}
          goal={goal}
          type={type}
          end={end}
          pEnd={pEnd}
        />
      </View>
      <View style={styles.goalWrapper} onLayout={getEnd}>
        <View style={{ width: `${percent}%` }} onLayout={getPend} />
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
