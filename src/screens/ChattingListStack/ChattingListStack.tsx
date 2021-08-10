import React from 'react';

import { createGatguStackNavigator } from '@/helpers/functions/navigation';

import ChattingList from './ChattingList';

export enum EChattingListStackScreens {
  ChattingList = 'ChattingList',
}

export type TChattingListStackParamList = {
  [EChattingListStackScreens.ChattingList]: undefined;
};

const ChattingListStack = createGatguStackNavigator<TChattingListStackParamList>();

const ChattingListStackScreen: React.FC = () => {
  return (
    <ChattingListStack.Navigator>
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
