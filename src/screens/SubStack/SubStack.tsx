import React from 'react';

import { createGatguStackNavigator } from '@/helpers/functions/navigation';

import UserProfile from './UserProfile/UserProfile';

export enum ESubStackScreens {
  UserProfile = 'UserProfile',
}

export type TSubStackParamList = {
  UserProfile: undefined;
};

const SubStack = createGatguStackNavigator<TSubStackParamList>();

const SubStackScreen: React.FC = () => {
  return (
    <SubStack.Navigator>
      <SubStack.Screen
        name={ESubStackScreens.UserProfile}
        component={UserProfile}
        options={{
          headerTitleAlign: 'center',
          headerTitle: '유저 프로필',
        }}
      />
    </SubStack.Navigator>
  );
};

export default SubStackScreen;
