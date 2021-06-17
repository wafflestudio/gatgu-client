import React from 'react';
import { Text } from 'react-native';

import { Label, View } from 'native-base';

import { ArticleStatus } from '@/constants/Enum';
import { calcTimeDiff } from '@/helpers/functions';
import { palette, typo } from '@/styles';
import { IArticleProps } from '@/types/article';

import styles from './Title.style';

interface ITitleProps {
  article: IArticleProps;
  orderStatus: ArticleStatus;
}

function Title({ article, orderStatus }: ITitleProps): JSX.Element {
  console.log('ㅁㄱ샤', article.written_at, article.time_in);
  // 남은 시간
  const { diff: timeLeft, type: typeLeft } =
    article.written_at !== undefined
      ? calcTimeDiff(article.written_at, article.time_in)
      : { diff: 0, type: 0 };
  // 몇 분 전
  const { diff: timeBefore, type: typeBefore } =
    article.written_at !== undefined
      ? calcTimeDiff(article.written_at, new Date())
      : { diff: 0, type: 0 };

  const isDone = orderStatus >= ArticleStatus.COMPLETE;

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
