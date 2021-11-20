import React from 'react';
import { View } from 'react-native';

import { HamburgerIcon } from 'native-base';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import { useSelector } from '@/helpers/hooks';
import { RootState } from '@/store';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoomTemplate({
  roomID,
}: {
  roomID: number;
}): JSX.Element {
  const navigation = useNavigation();

  const authorId = useSelector(
    (state: RootState) => state.chat.currentChatInfo.writer_id
  );

  console.debug('roomId:', roomID);
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
      <ChatsContainer roomID={roomID} author_id={authorId} />
    </View>
  );
}
