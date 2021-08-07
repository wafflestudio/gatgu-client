import React from 'react';
import { Text, Alert } from 'react-native';

import { Flex } from 'native-base';

import { GText } from '@/components/Gatgu/GText';

import styles from './FootTerms.style';

/* ------------------------ */
/*    약관 | 개인정보 처리방침   */
/* ------------------------ */
function FootTerms(): JSX.Element {
  return (
    <Flex alignItems="center" style={styles.smalls}>
      <GText
        size="tiny"
        color="gray"
        onPress={() => Alert.alert('not implemented')}
      >
        약관
      </GText>
      <Text style={styles.smallText}>|</Text>
      <GText
        size="tiny"
        color="gray"
        onPress={() => Alert.alert('not implemented')}
      >
        개인정보 처리방침
      </GText>
    </Flex>
  );
}

export default FootTerms;
