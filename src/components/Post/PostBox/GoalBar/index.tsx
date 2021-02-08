import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

interface IGoalBarProps {
  percent: number;
  goal: string;
  money?: boolean;
}

function GoalBar({ percent, goal, money }: IGoalBarProps) {
  const percentWidth = useMemo(() => {
    return `${percent}%`;
  }, [percent]);

  const backgroundColor = useMemo(() => (money ? styles.blue : styles.yellow), [
    money,
  ]);

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
