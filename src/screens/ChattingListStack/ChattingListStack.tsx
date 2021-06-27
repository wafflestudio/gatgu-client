import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ChattingList from './ChattingList';

export type TChattingListStackParamList = {
  ChattingList: undefined;
};

const ChattingListStack = createStackNavigator<TChattingListStackParamList>();

const ChattingListStackScreen: React.FC = () => {
  return (
    <ChattingListStack.Navigator>
      <ChattingListStack.Screen
        name="ChattingList"
        component={ChattingList}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ChattingListStack.Navigator>
  );
};

export default ChattingListStackScreen;
