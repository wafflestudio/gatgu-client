import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainStack, { TMainTabsParamList } from '@/screens/MainTabs';

import AuthStackScreen, {
  TAuthStackParamList,
} from './screens/AuthStack/AuthStack';
import ChattingRoomStackScreen, {
  TChattingRoomStackParamList,
} from './screens/ChattingRoomStack/ChattingRoomStack';

export type TAppStackParamList = {
  AuthStack: { screen: keyof TAuthStackParamList };
  MainStack: { screen: keyof TMainTabsParamList };
  ChattingRoomStack: { screen: keyof TChattingRoomStackParamList };
} & TAuthStackParamList &
  TMainTabsParamList &
  TChattingRoomStackParamList;

const AppStack = createStackNavigator<TAppStackParamList>();

const AppRouter: React.FC = () => {
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
            name="MainStack"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="ChattingRoomStack"
            component={ChattingRoomStackScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="AuthStack"
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppRouter;
