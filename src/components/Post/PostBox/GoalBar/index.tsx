import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

interface IGoalBarProps {
  percent: number;
  goal: string;
  money?: boolean;
}

function GoalBar({ percent, goal, money }: IGoalBarProps) {
  const percentWidth = `${percent}%`;

  const backgroundColor = money ? styles.blue : styles.yellow;
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
        <Text style={styles.goal}>{goal}</Text>
      </View>
    </>
  );
}

export default GoalBar;
