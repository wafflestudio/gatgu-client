import React from 'react';
import { Image } from 'react-native';

import { Flex } from 'native-base';

import { GSpace } from '@/components/Gatgu';
import { GButton } from '@/components/Gatgu/GButton';
import { GText } from '@/components/Gatgu/GText';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';

import FootTerms from '../../components/FootTerms';
import styles from './UnLogged.style';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useAppNavigation();

  return (
    <Flex justifyContent="space-between" style={styles.container}>
      <Flex alignItems="center">
        <GText bold textAlign="center" size={22}>
          {'로그인으로\n더 다양한 기능을 사용하세요.'}
        </GText>
        <GSpace h={8} />
        <GText size={16} color="gray">
          채팅을 통해 거래할 수 있어요
        </GText>
        <GSpace h={30} />
        <Image
          style={styles.image}
          source={require('@/assets/images/ProfilePageImage1.png')}
        />
        <Flex width="245px" alignItems="center" marginTop="60px">
          <GButton
            width="full"
            size="large"
            onPress={() => navigation.navigate(AppRoutes.Login)}
          >
            로그인
          </GButton>
          <GText
            touchable
            size={15}
            color="gray"
            textDecorationLine="underline"
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate(AppRoutes.SignUp)}
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
