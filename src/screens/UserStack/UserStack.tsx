import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import ProfileModify from './ProfileModify';
import UserGatgu from './UserGatgu';

export type TUserStackParamList = {
  Profile: undefined;
  ProfileModify: undefined;
  UserGatgu: undefined;
};

const UserStack = createStackNavigator<TUserStackParamList>();

const UserStackScreen: React.FC = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Profile" component={Profile} />
      <UserStack.Screen name="ProfileModify" component={ProfileModify} />
      <UserStack.Screen name="UserGatgu" component={UserGatgu} />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
