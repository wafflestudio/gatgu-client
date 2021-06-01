import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { View } from 'native-base';

import GoalBar from '@/components/ArticleBox/GoalBar';
import { IParticipantsSummary } from '@/types/article';

import styles from './GoalTopBubble.style';
import TopBubble from './TopBubble';

interface IGoalTopBubbleProps {
  summary: IParticipantsSummary | undefined;
  current: number | undefined;
  min_required: number;
}

function GoalTopBubble({
  summary,
  current,
  min_required,
}: IGoalTopBubbleProps): JSX.Element {
  const [end, setEnd] = useState<number>(0);
  const [pEnd, setPend] = useState<number>(0);

  const percent = current ? (current / min_required) * 100 : 0;

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
          goal={min_required}
          end={end}
          pEnd={pEnd}
        />
      </View>
      <View style={styles.goalWrapper} onLayout={getEnd}>
        <View style={{ width: `${percent}%` }} onLayout={getPend} />
        <GoalBar summary={summary} min_required={min_required} type={0} />
      </View>
    </View>
  );
}
export default GoalTopBubble;
