import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';

export type NavigatorParamList = {
  login: undefined;
  signUp: undefined;
};

// Navigator Param보다는 global store를 이용하자.
const Stack = createNativeStackNavigator<NavigatorParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login">
      <Stack.Screen name="login" component={() => <View />} />
      <Stack.Screen name="signUp" component={() => <View />} />
    </Stack.Navigator>
  );
};
