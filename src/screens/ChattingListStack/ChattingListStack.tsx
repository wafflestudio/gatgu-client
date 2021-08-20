import React from 'react';

import { useIsFocused } from '@react-navigation/core';

import { UnAuthorizedModal } from '@/components/UnAuthorizedModal';
import { createGatguStackNavigator } from '@/helpers/functions/navigation';
import { useSelector } from '@/helpers/hooks';

import ChattingList from './ChattingList';

export enum EChattingListStackScreens {
  ChattingList = 'ChattingList',
}

export type TChattingListStackParamList = {
  [EChattingListStackScreens.ChattingList]: undefined;
};

const ChattingListStack = createGatguStackNavigator<TChattingListStackParamList>();

const ChattingListStackScreen: React.FC = () => {
  const isLogined = useSelector((state) => state.user.isLogined);
  const isScreenFocused = useIsFocused();

  return (
    <>
      <ChattingListStack.Navigator>
        <ChattingListStack.Screen
          name={EChattingListStackScreens.ChattingList}
          component={ChattingList}
          options={{
            headerTitleAlign: 'center',
            title: '채팅 리스트',
          }}
        />
      </ChattingListStack.Navigator>
      <UnAuthorizedModal isOpen={isScreenFocused && !isLogined} />
    </>
  );
};

export default ChattingListStackScreen;
