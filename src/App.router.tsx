import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorScreenParams } from '@react-navigation/native';

import MainStack, { TMainTabsParamList } from '@/screens/MainTabs';

import GatguWebsocket from './helpers/GatguWebsocket/GatguWebsocket';
import { createGatguStackNavigator } from './helpers/functions/navigation';
import { useUserDetail } from './helpers/hooks/api';
import ChattingRoomStackScreen, {
  TChattingRoomStackParamList,
} from './screens/ChattingRoomStack/ChattingRoomStack';

export enum EAppStackScreens {
  MainStack = 'MainStack',
  ChattingRoomStack = 'ChattingRoomStack',
}

export type TAppStackParamList = {
  [EAppStackScreens.MainStack]: NavigatorScreenParams<TMainTabsParamList>;
  [EAppStackScreens.ChattingRoomStack]: NavigatorScreenParams<TChattingRoomStackParamList>;
} & TMainTabsParamList &
  TChattingRoomStackParamList;

const AppStack = createGatguStackNavigator<TAppStackParamList>();
// AsyncStorage.clear();

const AppRouter: React.FC = () => {
  const userQuery = useUserDetail();

  GatguWebsocket.useInit({
    // url: `ws://d6f2505199db.ngrok.io/ws/chat/${userQuery.data?.id}/`,
    url: `ws://8a62b80b1d39.ngrok.io/ws/chat/4/`,
    // url: `ws://c063d2a13d74.ngrok.io${userQuery.}`,
    // url: 'ws://67063aea84d4.ngrok.io/ws/chat',
    token: '',
    options: { debug: false },
  });

  return (
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
    </AppStack.Navigator>
  );
};

export default AppRouter;
