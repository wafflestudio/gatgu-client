import React from 'react';
import { View, Text, Image } from 'react-native';

import { Button, FootTerms } from '@/components';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import styles from './UnLogged.style';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인으로</Text>
      <Text style={styles.title}>더 다양한 기능을 사용하세요.</Text>
      <Text style={styles.info}>
        채팅을 통해 거래하거나 나의 등급 등을 알 수 있어요.
      </Text>
      <Image
        style={styles.image}
        source={require('@/assets/ProfilePage/Image1.png')}
      />
      <Image
        style={styles.image}
        source={require('@/assets/ProfilePage/Image2.png')}
      />
      <Button
        title="로그인하러 가기"
        style={styles.loginBtn}
        textStyle={styles.loginBtnText}
        onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}
      />
      <Button
        title="회원가입하러 가기"
        style={styles.signUpBtn}
        textStyle={styles.signUpBtnText}
        onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}
      />
      <FootTerms />
    </View>
  );
}

export default ProfileTemplate;
