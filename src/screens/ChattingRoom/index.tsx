import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ChatDrawer from './ChatDrawer';
import ChattingRoomTemplate from './ChattingRoomTemplate';

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
    nickname: 'heesu',
  },
  {
    profile_id: 2,
    picture: 'https://placeimg.com/140/138/any',
    nickname: 'heesu',
  },
];

function chatDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => (
        <ChatDrawer {...props} pictureUrls={mockUrls} users={mockUsers} />
      )}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name={'chatDrawer'} component={ChattingRoomTemplate} />
    </Drawer.Navigator>
  );
}

export default chatDrawer;
