import { Label, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './TopBubble.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';
import GoalBar from '@/components/ArticleBox/GoalBar';

interface ITopBubbleProps {
  current: number;
  goal: number;
  type: number;
}

// TODO:
// - change percent to 모집현황(current)
// - from need_type --> 명/원
// backend has changed api, so should change article types accordingly too --> API 연결할 때 한꺼번에 하겠음

function GoalTopBubble({ current, goal, type }: ITopBubbleProps): JSX.Element {
  return (
    <View>
      <View style={[styles.box]}>
        <Text>{current}</Text>
      </View>
    </View>
  );
}
export default GoalTopBubble;

// {width: `${percent}%`}
