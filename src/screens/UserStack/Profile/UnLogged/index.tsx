import React from 'react';
import { View, Text, Image } from 'react-native';

import { Flex } from 'native-base';

import { GButton } from '@/components/Gatgu/GButton';
import { GSpace } from '@/components/Gatgu/GSpace';
import { GText } from '@/components/Gatgu/GText';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import FootTerms from '../../components/FootTerms';
import styles from './UnLogged.style';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useAppNavigation();

  return (
    <Flex justifyContent="space-between" style={styles.container}>
      <Flex alignItems="center">
        <Text style={styles.title}>로그인으로</Text>
        <Text style={styles.title}>더 다양한 기능을 사용하세요.</Text>
        <Text style={styles.info}>
          채팅을 통해 거래하거나 나의 등급 등을 알 수 있어요.
        </Text>
        <Image
          style={styles.image}
          source={require('@/assets/images/ProfilePageImage1.png')}
        />
        <Image
          style={styles.image}
          source={require('@/assets/images/ProfilePageImage2.png')}
        />
        <Flex width="245px" alignItems="center">
          <GButton
            width="full"
            size="large"
            onPress={() =>
              navigation.navigate('AuthStack', { screen: 'Login' })
            }
          >
            로그인
          </GButton>
          <GText
            touchable
            size="big"
            color="gray"
            textDecorationLine="underline"
            style={{ marginTop: 10 }}
            onPress={() =>
              navigation.navigate('AuthStack', { screen: 'SignUp' })
            }
          >
            회원가입
          </GText>
        </Flex>
      </Flex>
      <FootTerms />
    </Flex>
  );
}

export default ProfileTemplate;
