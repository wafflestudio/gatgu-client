import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import MainStack, { TMainTabsParamList } from '@/screens/MainTabs';

import GatguWebsocket from './helpers/GatguWebsocket/GatguWebsocket';
import { navigationRef } from './helpers/bootstrap/rootNavigation';
import { linking } from './helpers/bootstrap/utils/navigation';
import { createGatguStackNavigator } from './helpers/functions/navigation';
import { useUserDetail } from './helpers/hooks/api';
import ChattingRoomStackScreen, {
  TChattingRoomStackParamList,
} from './screens/ChattingRoomStack/ChattingRoomStack';
import SubStackScreen from './screens/SubStack/SubStack';

export enum EAppStackScreens {
  MainStack = 'MainStack',
  ChattingRoomStack = 'ChattingRoom',
  SubStack = 'SubStack',
}

export type TAppStackParamList = {
  [EAppStackScreens.MainStack]: NavigatorScreenParams<TMainTabsParamList>;
  [EAppStackScreens.ChattingRoomStack]: NavigatorScreenParams<TChattingRoomStackParamList>;
  [EAppStackScreens.SubStack]: undefined;
} & TMainTabsParamList &
  TChattingRoomStackParamList;

const AppStack = createGatguStackNavigator<TAppStackParamList>();

const AppRouter: React.FC = () => {
  const userQuery = useUserDetail();
  GatguWebsocket.useInit({
    url: `ws://gatgu-api.wafflestudio.com/ws/chat/`,
    token: userQuery.data?.id,
    options: { debug: false },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer ref={navigationRef} linking={linking}>
        <AppStack.Navigator>
          <AppStack.Screen
            name={EAppStackScreens.MainStack}
            component={MainStack}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name={EAppStackScreens.ChattingRoomStack}
            component={ChattingRoomStackScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name={EAppStackScreens.SubStack}
            component={SubStackScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppRouter;
