import React from 'react';
import Button from '../Button';
import { View, Text } from 'react-native';
import styles from './FootTerms.style';

/* ------------------------ */
/*    약관 | 개인정보 처리방침   */
/* ------------------------ */
function FootTerms(): JSX.Element {
  return (
    <View style={styles.smalls}>
      <Button
        style={styles.smallBtn}
        textStyle={styles.smallBtnText}
        title="약관"
        onPress={() => alert('not implemented')}
      />
      <Text style={styles.smallText}>|</Text>
      <Button
        style={styles.smallBtn}
        textStyle={styles.smallBtnText}
        title="개인정보 처리방침"
        onPress={() => alert('not implemented')}
      />
    </View>
  );
}

export default FootTerms;
