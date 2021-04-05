import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/core';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { RootState } from '@/store';
import { getChatInfo } from '@/store/chatSlice';
import { ChattingDrawerParamList } from '@/types/navigation';

import ChattingRoomTemplate from './ChattingRoomTemplate';
import RightDrawer from './Drawer';

const Drawer = createDrawerNavigator();

const mockUrls = [
  'https://placeimg.com/140/140/any',
  'https://placeimg.com/140/139/any',
  'https://placeimg.com/140/137/any',
  'https://placeimg.com/140/138/any',
];

const mockUsers = [
  {
    profile_id: 1,
    picture: 'https://placeimg.com/140/138/any',
    nickname: 'nickname1',
    updated_at: 'ss',
    withdrew_at: 'ww',
  },
  {
    profile_id: 2,
    picture: 'https://placeimg.com/140/138/any',
    nickname: 'nickname2',
    updated_at: 'sss',
    withdrew_at: 'www',
  },
];

// TODO: @juimdpp
// todo: 아래 FIXME로 적혀있는것들
// when: when api becomes stable

function ChatDrawer(): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  // const id = route.params.id;
  const id = 1; // replace with above
  const dispatch = useDispatch();

  const currentChatInfo = useSelector(
    (state: RootState) => state.chat.currentChatInfo
  );

  useEffect(() => {
    dispatch(getChatInfo(id));
    // handle error case
  }, []);
  // FIXME
  const urls = currentChatInfo.uri ? [currentChatInfo.uri] : mockUrls;
  const participants = currentChatInfo.participant_profile
    ? currentChatInfo.participant_profile
    : mockUsers;

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => (
        <RightDrawer {...props} pictureUrls={urls} users={participants} />
      )}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name={'chatDrawer'} component={ChattingRoomTemplate} />
    </Drawer.Navigator>
  );
}

export default ChatDrawer;
