import React, { useEffect } from 'react';

import _ from 'lodash';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { RouteProp, useRoute } from '@react-navigation/native';

import { ChattingDrawerParamList } from '@/types/navigation';

import ChattingRoomTemplate from './ChattingRoomTemplate';
import RightDrawer from './Drawer';

export enum EChattingRoomStackScreens {
  ChattingRoom = 'ChattingRoom',
}

export type TChattingRoomStackParamList = {
  [EChattingRoomStackScreens.ChattingRoom]: {
    id: number;
    author_id: number;
  };
};

const Drawer = createDrawerNavigator<TChattingRoomStackParamList>();

// TODO: @juimdpp
// todo: 아래 FIXME로 적혀있는것들
// when: when api becomes stable

function ChattingRoomStackScreen(): JSX.Element {
  const route = useRoute<
    RouteProp<ChattingDrawerParamList, EChattingRoomStackScreens.ChattingRoom>
  >();
  const roomID = route.params.id;
  const author_id = route.params.author_id;

  useEffect(() => {
    // dispatch(getChatInfo(id));
    // handle error case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ChattingRoomScreen = React.useCallback(
    () => <ChattingRoomTemplate roomID={roomID} author_id={author_id} />,
    [roomID]
  );

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <RightDrawer roomID={roomID} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen
        name={EChattingRoomStackScreens.ChattingRoom}
        component={ChattingRoomScreen}
      />
    </Drawer.Navigator>
  );
}

export default ChattingRoomStackScreen;
