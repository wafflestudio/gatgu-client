import React from 'react';

import { createGatguStackNavigator } from '@/helpers/functions/navigation';

import { Configs } from './Configs';
import Login from './Login';
import Profile from './Profile';
import ProfileModify from './ProfileModify';
import ServiceTerms from './ServiceTerms';
import SignUp from './SignUp';
import UserGatgu from './UserGatgu';

export enum EUserStackScreens {
  // stack name
  UserStack = 'UserStack',

  // profile
  Profile = 'Profile',
  ProfileModify = 'ProfileModify',
  UserGatgu = 'UserGatgu',
  Configs = 'Configs',

  // auth
  Login = 'Login',
  SignUp = 'SignUp',
  ServiceTerms = 'ServiceTerms',
}

export type TUserStackParamList = {
  [EUserStackScreens.UserStack]: undefined;
  [EUserStackScreens.Login]: undefined;
  [EUserStackScreens.SignUp]: undefined;
  [EUserStackScreens.ServiceTerms]: undefined;
  [EUserStackScreens.Profile]: undefined;
  [EUserStackScreens.ProfileModify]: undefined;
  [EUserStackScreens.UserGatgu]: undefined;
  [EUserStackScreens.Configs]: undefined;
};

const UserStack = createGatguStackNavigator<TUserStackParamList>();

const UserStackScreen: React.FC = () => {
  return (
    <UserStack.Navigator>
      {/* profil group */}
      <UserStack.Screen name={EUserStackScreens.Profile} component={Profile} />
      <UserStack.Screen
        name={EUserStackScreens.ProfileModify}
        component={ProfileModify}
        options={{
          headerTitle: '프로필 수정',
        }}
      />
      <UserStack.Screen
        name={EUserStackScreens.UserGatgu}
        component={UserGatgu}
        options={{
          headerTitle: '나의 같구',
        }}
      />
      <UserStack.Screen
        name={EUserStackScreens.Configs}
        component={Configs}
        options={{
          headerTitle: '설정',
        }}
      />

      {/* auth group*/}
      <UserStack.Screen
        name={EUserStackScreens.Login}
        component={Login}
        options={{
          title: '로그인',
          headerTitleAlign: 'center',
        }}
      />
      <UserStack.Screen
        name={EUserStackScreens.SignUp}
        component={SignUp}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
      <UserStack.Screen
        name={EUserStackScreens.ServiceTerms}
        component={ServiceTerms}
        options={{
          title: '약관 동의',
          headerTitleAlign: 'center',
        }}
      />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
