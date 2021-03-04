import { View } from 'native-base';
import React, { useState } from 'react';
import styles from './GoalTopBubble.style';
import GoalBar from '@/components/ArticleBox/GoalBar';
import TopBubble from './TopBubble';
import { LayoutChangeEvent } from 'react-native';
import { IS_MONEY } from '@/constants/Enum';

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
  const isMoney = type === IS_MONEY;

  const getEnd = (event: LayoutChangeEvent) => {
    setEnd(event.nativeEvent.layout.width);
  };
  const getPend = (event: LayoutChangeEvent) => {
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
          goal={`${goal}${type === IS_MONEY ? '원' : '명'}`}
          isMoney={isMoney}
        />
      </View>
    </View>
  );
}
export default GoalTopBubble;
