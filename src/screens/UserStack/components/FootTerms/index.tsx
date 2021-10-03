import React from 'react';
import { Text } from 'react-native';

import { Flex } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { GText } from '@/components/Gatgu/GText';
import { ESubStackScreens } from '@/screens/SubStack/SubStack';

import styles from './FootTerms.style';

/* ------------------------ */
/*    약관 | 개인정보 처리방침   */
/* ------------------------ */
function FootTerms(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Flex alignItems="center" style={styles.smalls}>
      <GText
        touchable
        size={11}
        color="gray"
        onPress={() =>
          navigation.navigate('SubStack', {
            screen: ESubStackScreens.ServiceTerms,
          })
        }
      >
        약관
      </GText>
      <Text style={styles.smallText}>|</Text>
      <GText
        touchable
        size={11}
        color="gray"
        onPress={() =>
          navigation.navigate('SubStack', {
            screen: ESubStackScreens.PrivateInfo,
          })
        }
      >
        개인정보 처리방침
      </GText>
    </Flex>
  );
}

export default FootTerms;
