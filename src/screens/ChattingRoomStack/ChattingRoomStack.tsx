import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { RouteProp, useRoute } from '@react-navigation/native';

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
  const author_id = route.params.author_id;

  const ChattingRoomScreen = React.useCallback(
    () => <ChattingRoomTemplate roomID={roomID} author_id={author_id} />,
    [roomID, author_id]
  );

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <RightDrawer roomID={roomID} authorId={author_id} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen
        name={EChattingRoomStackScreens.ChattingRoom}
        component={ChattingRoomScreen}
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
