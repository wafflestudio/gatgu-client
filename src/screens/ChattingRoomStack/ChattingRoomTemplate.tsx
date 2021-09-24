import React from 'react';
import { View } from 'react-native';

import { HamburgerIcon } from 'native-base';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import { AppRoutes } from '@/helpers/routes';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoomTemplate({
  roomID,
  author_id,
}: {
  roomID: number;
  author_id: number;
}): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="채팅방"
        right={<HamburgerIcon />}
        rightCallback={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        left={<Header.BackButton />}
        leftCallback={() => {
          navigation.navigate('MainStack', {
            screen: 'ChattingList',
          });
        }}
      />
      <ChatsContainer roomID={roomID} author_id={author_id} />
    </View>
  );
}
