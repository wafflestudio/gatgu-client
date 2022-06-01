import React from 'react';
import {Text, View} from 'react-native';
import {GButton} from '@/components/Gatgu/GButton';
import LoginStyles from './login.style';
import Logo from '@/assets/icons/Logo';

const Login = () => {
  return (
    <View style={LoginStyles.login}>
      <Logo.mainLogo />
      <View style={LoginStyles.kakaoButton}>
        <GButton theme="yellow" textProps={{color: 'dark', size: 16}}>
          카카오 로그인
        </GButton>
      </View>
    </View>
  );
};

export default Login;
