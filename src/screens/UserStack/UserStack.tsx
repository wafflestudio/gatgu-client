import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Configs } from './Configs';
import Profile from './Profile';
import ProfileModify from './ProfileModify';
import UserGatgu from './UserGatgu';

export enum EUserStackScreens {
  Profile = 'Profile',
  ProfileModify = 'ProfileModify',
  UserGatgu = 'UserGatgu',
  Configs = 'Configs',
}

export type TUserStackParamList = {
  [EUserStackScreens.Profile]: undefined;
  [EUserStackScreens.ProfileModify]: undefined;
  [EUserStackScreens.UserGatgu]: undefined;
  [EUserStackScreens.Configs]: undefined;
};

const UserStack = createStackNavigator<TUserStackParamList>();

const UserStackScreen: React.FC = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
      }}
    >
      <UserStack.Screen name={EUserStackScreens.Profile} component={Profile} />
      <UserStack.Screen
        name={EUserStackScreens.ProfileModify}
        component={ProfileModify}
      />
      <UserStack.Screen
        name={EUserStackScreens.UserGatgu}
        component={UserGatgu}
      />
      <UserStack.Screen
        name={EUserStackScreens.Configs}
        component={Configs}
        options={{
          headerTitle: '설정',
        }}
      />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
