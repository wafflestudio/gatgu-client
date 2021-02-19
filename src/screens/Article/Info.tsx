import { Label, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Info.style';
import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';
import GoalBar from '@/components/ArticleBox/GoalBar';

// will change input type (left it because will probably need it afterwards)
function Info({ location, notInAPI }: IArticleProps): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>거래 지역</Label>
        <Text style={{ ...typo.info }}>{location}</Text>
      </View>
      <View style={styles.subConNoBorder}>
        <Label style={styles.label}>모집 인원</Label>
        <GoalBar {...notInAPI} />
      </View>
    </View>
  );
}
export default Info;
