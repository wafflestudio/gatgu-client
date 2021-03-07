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

function chatDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => (
        <ChatDrawer {...props} pictureUrls={mockUrls} />
      )}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name={'chatDrawer'} component={ChattingRoomTemplate} />
    </Drawer.Navigator>
  );
}

export default chatDrawer;
