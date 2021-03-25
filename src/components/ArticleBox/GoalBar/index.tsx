import React from 'react';
import { View, Text } from 'react-native';

import styles from './GoalBar.style';
import { IS_PEOPLE } from '@/constants/Enum';
import { IParticipantsSummary } from '@/types/article';

interface IGoalBarProps {
  summary: IParticipantsSummary;
  min_required: number;
  type: number;
}

function GoalBar({ summary, min_required, type }: IGoalBarProps): JSX.Element {
  const isPeople = type === IS_PEOPLE;
  const percentWidth = `${
    (isPeople
      ? summary?.count
        ? summary.count
        : 0
      : summary?.price
      ? summary.price
      : 0) / min_required
  }%`;
  const backgroundColor = isPeople ? styles.blue : styles.yellow;
  const goalText = `${min_required} ${isPeople ? '명' : '원'}`;

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.goalBox}>
          <View
            style={[
              styles.percentBox,
              { width: percentWidth },
              backgroundColor,
            ]}
          />
        </View>
        <Text style={styles.goal}>{goalText}</Text>
      </View>
    </>
  );
}

export default GoalBar;
