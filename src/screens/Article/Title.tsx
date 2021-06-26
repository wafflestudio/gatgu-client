import React from 'react';
import { Text } from 'react-native';

import { Label, View } from 'native-base';

import { ColorArticleStatus, StringArticleStatus } from '@/enums/articleStatus';
import { calcTimeDiff } from '@/helpers/functions';
import { typo } from '@/styles';
import { IArticleProps, IArticleStatus } from '@/types/article';

import styles from './Title.style';

interface ITitleProps {
  article: IArticleProps;
  orderStatus: IArticleStatus;
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
      ? calcTimeDiff(article.created_at, new Date())
      : { diff: 0, type: 0 };

  const progress_status = orderStatus.progress_status;

  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label
          style={[
            styles.label,
            { ...typo.bigTitle },
            { color: ColorArticleStatus[progress_status] },
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
