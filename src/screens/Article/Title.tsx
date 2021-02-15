import { Label, View } from 'native-base';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import styles from './Title.style';
import { palette, typo } from '@/styles';
import { calcTimeDiff } from '@/helpers/functions/index';

// will change input type
function Title({ dummyArticle }: any): JSX.Element {
  // 남은 시간
  const timeLeft = useMemo(
    () => calcTimeDiff(dummyArticle.created_at, dummyArticle.dueDate),
    [dummyArticle.created_at, dummyArticle.dueDate]
  );
  // 몇 분 전
  const timeBefore = useMemo(
    () => calcTimeDiff(dummyArticle.created_at, new Date()),
    [dummyArticle.created_at, new Date()]
  );

  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label
          style={[styles.label, { color: palette.yellow, ...typo.bigTitle }]}
        >
          판매
        </Label>
        <Text style={{ ...typo.bigTitle }}>{dummyArticle.title}</Text>
      </View>
      <View style={[styles.subConNoBorder, { paddingLeft: 15 }]}>
        <Text style={styles.subText}>{timeBefore}분 전 · </Text>
        <Text style={styles.subText}>{timeLeft}일 남음</Text>
      </View>
    </View>
  );
}
export default Title;