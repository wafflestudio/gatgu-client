import React from 'react';
import { View, Text } from 'react-native';

import styles from './GoalBar.style';

interface IGoalBarProps {
  percent: number;
  goal: string;
  isMoney?: boolean;
}

function GoalBar({ percent, goal, isMoney }: IGoalBarProps): JSX.Element {
  const percentWidth = `${percent}%`;
  const backgroundColor = isMoney ? styles.blue : styles.yellow;

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
