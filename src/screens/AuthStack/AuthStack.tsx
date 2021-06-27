import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginTemplate from './Login';
import ServiceTerms from './ServiceTerms';
import SignUp from './SignUp';

export type TAuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ServiceTerms: undefined;
};

const AuthStack = createStackNavigator<TAuthStackParamList>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginTemplate}
        options={{
          title: '로그인',
          headerTitleAlign: 'center',
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
      <AuthStack.Screen
        name="ServiceTerms"
        component={ServiceTerms}
        options={{
          title: '약관 동의',
          headerTitleAlign: 'center',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
