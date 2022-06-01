import React from 'react';
import {Text, View} from 'react-native';
import {GButton} from '@/components/Gatgu/GButton';
import LoginStyles from './login.style';

const Login = () => {
  return (
    <View style={LoginStyles.login}>
      <View style={LoginStyles.kakaoButton}>
        <GButton theme="yellow">
          <Text style={{color: 'black', fontSize: 16}}>카카오 로그인</Text>
        </GButton>
      </View>
    </View>
  );
};

export default Login;
