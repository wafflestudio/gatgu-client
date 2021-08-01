import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ChattingList from './ChattingList';

export enum EChattingListStackScreens {
  ChattingList = 'ChattingList',
}

export type TChattingListStackParamList = {
  [EChattingListStackScreens.ChattingList]: undefined;
};

const ChattingListStack = createStackNavigator<TChattingListStackParamList>();

const ChattingListStackScreen: React.FC = () => {
  return (
    <ChattingListStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
      }}
    >
      <ChattingListStack.Screen
        name={EChattingListStackScreens.ChattingList}
        component={ChattingList}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ChattingListStack.Navigator>
  );
};

export default ChattingListStackScreen;
