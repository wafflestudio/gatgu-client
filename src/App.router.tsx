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

export type TAppStackParamList = TMainTabsParamList &
  TChattingRoomStackParamList &
  TAuthStackParamList;

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
            name="Home"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="ChattingRoom"
            component={ChattingRoomStackScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Login"
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppRouter;
