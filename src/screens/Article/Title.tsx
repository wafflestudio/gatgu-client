import { Label, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Title.style';
import { palette, typo } from '@/styles';
import { calcTimeDiff } from '@/helpers/functions';
import { IArticleProps } from '@/types/article';
import { Status } from '@/constants/Enum';

interface ITitleProps {
  article: IArticleProps;
  orderStatus: number;
}

function Title({ article, orderStatus }: ITitleProps): JSX.Element {
  // 남은 시간
  const { diff: timeLeft, type: typeLeft } =
    article.created_at !== undefined
      ? calcTimeDiff(article.created_at, article.time_in)
      : { diff: 0, type: 0 };
  // 몇 분 전
  const { diff: timeBefore, type: typeBefore } =
    article.created_at !== undefined
      ? calcTimeDiff(article.created_at, 'current')
      : { diff: 0, type: 0 };

  const isDone = orderStatus >= Status.ORDER_COMPLETE;

  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label
          style={[
            styles.label,
            { ...typo.bigTitle },
            !isDone ? { color: palette.yellow } : { color: palette.gray },
          ]}
        >
          {isDone ? '완료' : '판매'}
        </Label>
        <Text style={{ ...typo.bigTitle }}>{article.title}</Text>
      </View>
      <View style={[styles.subConNoBorder, { paddingLeft: 15 }]}>
        <Text style={styles.subText}>
          {timeBefore} {typeBefore} 전 ·{' '}
        </Text>
        <Text style={styles.subText}>
          {timeLeft} {typeLeft} 남음
        </Text>
      </View>
    </View>
  );
}
export default Title;
