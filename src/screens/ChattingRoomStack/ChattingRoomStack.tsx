import React from 'react';
import { useDispatch } from 'react-redux';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { RouteProp, useRoute } from '@react-navigation/native';

import { getChatInfo } from '@/store/chatSlice';
import { ChattingDrawerParamList } from '@/types/navigation';

import { ChattingRoomImages } from './ChattingRoomImages';
import ChattingRoomTemplate from './ChattingRoomTemplate';
import RightDrawer from './Drawer';

export enum EChattingRoomStackScreens {
  ChattingRoom = 'ChattingRoom',
  ChattingRoomImages = 'ChattingRoomImages',
}

export type TChattingRoomStackParamList = {
  [EChattingRoomStackScreens.ChattingRoom]: {
    id: number;
    author_id: number;
  };
  [EChattingRoomStackScreens.ChattingRoomImages]: undefined;
};

const Drawer = createDrawerNavigator<TChattingRoomStackParamList>();

function ChattingRoomStackScreen(): JSX.Element {
  const route = useRoute<
    RouteProp<ChattingDrawerParamList, EChattingRoomStackScreens.ChattingRoom>
  >();
  const roomID = route.params.id;

  const dispatch = useDispatch();

  const ChattingRoom = React.useCallback(
    () => <ChattingRoomTemplate roomID={roomID} />,
    [roomID]
  );

  React.useEffect(() => {
    dispatch(getChatInfo(roomID));
  }, [roomID, dispatch]);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <RightDrawer roomID={roomID} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen
        name={EChattingRoomStackScreens.ChattingRoom}
        component={ChattingRoom}
      />
      <Drawer.Screen
        name={EChattingRoomStackScreens.ChattingRoomImages}
        component={ChattingRoomImages}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default ChattingRoomStackScreen;
