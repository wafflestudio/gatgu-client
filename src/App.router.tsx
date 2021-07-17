import React from 'react';

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

const AppRouter: React.FC = () => {
  const userQuery = useUserDetail();

  GatguWebsocket.useInit({
    url: `ws://e2b808ab505c.ngrok.io/ws/chat/${userQuery.data?.id}/`,
    // url: 'ws://67063aea84d4.ngrok.io/ws/chat',
    token: '',
    options: { debug: true },
  });

  return (
<<<<<<< HEAD
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
          {/* <AppStack.Screen
            name={EAppStackScreens.AuthStack}
            component={AuthStackScreen}
            options={{ headerShown: false }}
          /> */}
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
=======
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
        name={EAppStackScreens.AuthStack}
        component={AuthStackScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
>>>>>>> 2abd3705 (initialize ios local push notification)
  );
};

export default AppRouter;
