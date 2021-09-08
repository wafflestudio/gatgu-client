import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import MainStack, { TMainTabsParamList } from '@/screens/MainTabs';

import GatguWebsocket from './helpers/GatguWebsocket/GatguWebsocket';
import { createGatguStackNavigator } from './helpers/functions/navigation';
import { useUserDetail } from './helpers/hooks/api';
import ChattingRoomStackScreen, {
  TChattingRoomStackParamList,
} from './screens/ChattingRoomStack/ChattingRoomStack';
import SubStackScreen from './screens/SubStack/SubStack';

export enum EAppStackScreens {
  MainStack = 'MainStack',
  ChattingRoomStack = 'ChattingRoomStack',
  SubStack = 'SubStack',
}

export type TAppStackParamList = {
  [EAppStackScreens.MainStack]: NavigatorScreenParams<TMainTabsParamList>;
  [EAppStackScreens.ChattingRoomStack]: NavigatorScreenParams<TChattingRoomStackParamList>;
  [EAppStackScreens.SubStack]: undefined;
} & TMainTabsParamList &
  TChattingRoomStackParamList;

const AppStack = createGatguStackNavigator<TAppStackParamList>();
// AsyncStorage.clear();

const AppRouter: React.FC = () => {
  const userQuery = useUserDetail();
  GatguWebsocket.useInit({
    url: `ws://b775bba97a46.ngrok.io/ws/chat/${userQuery.data?.id}/`,
    token: '',
    options: { debug: true },
  });

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
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
            name={EAppStackScreens.SubStack}
            component={SubStackScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppRouter;
