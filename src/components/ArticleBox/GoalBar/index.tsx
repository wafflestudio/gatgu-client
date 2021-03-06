import React from 'react';
import { View, Text } from 'react-native';

import styles from './GoalBar.style';
import { IS_PEOPLE } from '@/constants/Enum';
import { IParticipantsSummary } from '@/types/article';

interface IGoalBarProps {
  summary: IParticipantsSummary;
  goal: { price_min: number; people_min: number };
  type: number;
}

function GoalBar({ summary, goal, type }: IGoalBarProps): JSX.Element {
  const renderedGoal = type === IS_PEOPLE ? goal.people_min : goal.price_min;
  const percentWidth = `${
    (type === IS_PEOPLE ? summary.count : summary.price) / renderedGoal
  }%`;
  const backgroundColor = type === IS_PEOPLE ? styles.blue : styles.yellow;
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
        <Text style={styles.goal}>{renderedGoal}</Text>
      </View>
    </>
  );
}

export default GoalBar;
