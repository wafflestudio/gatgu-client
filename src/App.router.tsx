import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainStack, { TMainTabsParamList } from '@/screens/MainTabs';

import { getMyData } from './apis/UserApi';
import GatguWebsocket from './helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from './queryKeys';
import AuthStackScreen, {
  TAuthStackParamList,
} from './screens/AuthStack/AuthStack';
import ChattingRoomStackScreen, {
  TChattingRoomStackParamList,
} from './screens/ChattingRoomStack/ChattingRoomStack';
import { IUserDetail } from './types/user';

export enum EAppStackScreens {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
  ChattingRoomStack = 'ChattingRoomStack',
}

export type TAppStackParamList = {
  [EAppStackScreens.AuthStack]: NavigatorScreenParams<TAuthStackParamList>;
  [EAppStackScreens.MainStack]: NavigatorScreenParams<TMainTabsParamList>;
  [EAppStackScreens.ChattingRoomStack]: NavigatorScreenParams<TChattingRoomStackParamList>;
} & TAuthStackParamList &
  TMainTabsParamList &
  TChattingRoomStackParamList;

const AppStack = createStackNavigator<TAppStackParamList>();

const AppRouter: React.FC = () => {
  const userQuery = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );
  GatguWebsocket.useInit({
    url: 'ws://e91195b727de.ngrok.io/ws/chat',
    token: parseInt(`${userQuery.data?.id}/`),
    options: { debug: true },
  });

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <AppStack.Navigator>
          <AppStack.Screen
            name={EAppStackScreens.MainStack}
            component={MainStack}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="ChattingRoom"
            component={ChattingRoomStackScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name={EAppStackScreens.AuthStack}
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppRouter;
