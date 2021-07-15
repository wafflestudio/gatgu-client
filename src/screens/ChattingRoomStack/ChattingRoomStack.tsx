import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/core';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { getMyData } from '@/apis/UserApi';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { RootState } from '@/store';
import { getChatInfo } from '@/store/chatSlice';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IUserDetail } from '@/types/user';

import ChattingRoomTemplate from './ChattingRoomTemplate';
import RightDrawer from './Drawer';

export enum EChattingRoomStackScreens {
  ChattingRoom = 'ChattingRoom',
}

export type TChattingRoomStackParamList = {
  [EChattingRoomStackScreens.ChattingRoom]: undefined;
};

const Drawer = createDrawerNavigator<TChattingRoomStackParamList>();

const mockUrls = [
  'https://placeimg.com/140/140/any',
  'https://placeimg.com/140/139/any',
  'https://placeimg.com/140/137/any',
  'https://placeimg.com/140/138/any',
];

// TODO: @juimdpp
// todo: 아래 FIXME로 적혀있는것들
// when: when api becomes stable

function ChattingRoomStackScreen(): JSX.Element {
  const dispatch = useDispatch();

  const currentChatInfo = useSelector(
    (state: RootState) => state.chat.currentChatInfo
  );

  useEffect(() => {
    // dispatch(getChatInfo(id));
    // handle error case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FIXME
  // todo: remove mocks
  // when: for urls: when backend implements request for just uris
  //       for participants:
  const urls = currentChatInfo.uri ? [currentChatInfo.uri] : mockUrls;

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <RightDrawer pictureUrls={urls} users={[]} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name="ChattingRoom" component={ChattingRoomTemplate} />
    </Drawer.Navigator>
  );
}

export default ChattingRoomStackScreen;
