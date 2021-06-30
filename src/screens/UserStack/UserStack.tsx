import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import ProfileModify from './ProfileModify';
import UserGatgu from './UserGatgu';

export enum EUserStackScreens {
  Profile = 'Profile',
  ProfileModify = 'ProfileModify',
  UserGatgu = 'UserGatgu',
}

export type TUserStackParamList = {
  [EUserStackScreens.Profile]: undefined;
  [EUserStackScreens.ProfileModify]: undefined;
  [EUserStackScreens.UserGatgu]: undefined;
};

const UserStack = createStackNavigator<TUserStackParamList>();

const UserStackScreen: React.FC = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name={EUserStackScreens.Profile} component={Profile} />
      <UserStack.Screen
        name={EUserStackScreens.ProfileModify}
        component={ProfileModify}
      />
      <UserStack.Screen
        name={EUserStackScreens.UserGatgu}
        component={UserGatgu}
      />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
