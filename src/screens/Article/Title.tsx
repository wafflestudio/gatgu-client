import React from 'react';
import { Text } from 'react-native';

import { Label, View } from 'native-base';

import { ArticleStatus } from '@/constants/Enum';
import { calcTimeDiff } from '@/helpers/functions';
import { palette, typo } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';

import styles from './Title.style';

interface ITitleProps {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}
const StringArticleStatus = [
  'UNDEFINED',
  '모집중',
  '거래중',
  '거래완료',
  '기간만료',
];
const Color = ['black', palette.yellow, 'orange', palette.blue, palette.gray];

function Title({ article, orderStatus }: ITitleProps): JSX.Element {
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

  const progress_status = orderStatus.progress_status;

  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label
          style={[
            styles.label,
            { ...typo.bigTitle },
            { color: Color[progress_status] },
          ]}
        >
          {StringArticleStatus[progress_status]}
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
