import { Label, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Info.style';
import { typo } from '@/styles';

// will change input type (left it because will probably need it afterwards)
function Info({ dummyArticle }: any): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <View style={styles.subContainer}>
        <View style={styles.subConNoBorder}>
          <Label style={styles.label}>거래 지역</Label>
          <Text style={{ ...typo.info }}>기숙사</Text>
        </View>
        <View style={styles.subConNoBorder}>
          <Label style={styles.label}>모집 인원</Label>
          <Text>Golden Bar</Text>
        </View>
      </View>
    </View>
  );
}
export default Info;
