import React from 'react';

import { createGatguStackNavigator } from '@/helpers/functions/navigation';

import ServiceTerms from '../UserStack/ServiceTerms';
import PrivateInfo from './PrivateInfo/PrivateInfo';
import UserProfile from './UserProfile/UserProfile';

export enum ESubStackScreens {
  UserProfile = 'UserProfile',
  ServiceTerms = 'ServiceTerms',
  PrivateInfo = 'PrivateInfo',
}

export type TSubStackParamList = {
  UserProfile: undefined;
  ServiceTerms: undefined;
  PrivateInfo: undefined;
};

const SubStack = createGatguStackNavigator<TSubStackParamList>();

const SubStackScreen = () => {
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
      <SubStack.Screen
        name={ESubStackScreens.ServiceTerms}
        component={ServiceTerms}
        options={{
          headerTitleAlign: 'center',
          headerTitle: '이용 약관',
        }}
      />
      <SubStack.Screen
        name={ESubStackScreens.PrivateInfo}
        component={PrivateInfo}
        options={{
          headerTitleAlign: 'center',
          headerTitle: '개인 정보',
        }}
      />
    </SubStack.Navigator>
  );
};

export default SubStackScreen;
