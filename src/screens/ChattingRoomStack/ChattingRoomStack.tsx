import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootState } from '@/store';
import { ChattingDrawerParamList } from '@/types/navigation';

import ChattingRoomTemplate from './ChattingRoomTemplate';
import RightDrawer from './Drawer';

export enum EChattingRoomStackScreens {
  ChattingRoom = 'ChattingRoom',
}

export type TChattingRoomStackParamList = {
  [EChattingRoomStackScreens.ChattingRoom]: {
    id: number;
  };
};

const Drawer = createDrawerNavigator<TChattingRoomStackParamList>();

// TODO: @juimdpp
// todo: 아래 FIXME로 적혀있는것들
// when: when api becomes stable

function ChattingRoomStackScreen(): JSX.Element {
  const currentChatInfo = useSelector(
    (state: RootState) => state.chat.currentChatInfo
  );
  const route = useRoute<
    RouteProp<ChattingDrawerParamList, EChattingRoomStackScreens.ChattingRoom>
  >();
  const roomID = route.params.id;
  useEffect(() => {
    // dispatch(getChatInfo(id));
    // handle error case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <RightDrawer roomID={roomID} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen
        name={EChattingRoomStackScreens.ChattingRoom}
        component={() => <ChattingRoomTemplate roomID={roomID} />}
      />
    </Drawer.Navigator>
  );
}

export default ChattingRoomStackScreen;
