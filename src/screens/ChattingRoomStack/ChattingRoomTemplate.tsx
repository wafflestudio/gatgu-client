import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';

import { ArrowBackIcon, HamburgerIcon } from 'native-base';

import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Header } from '@/components';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoomTemplate({
  roomID,
}: {
  roomID: number;
}): JSX.Element {
  const navigation = useNavigation();
  const [height, setHeight] = useState<number>(0);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title="채팅방"
        titleStyle={{ fontSize: 20 }}
        right={<HamburgerIcon />}
        rightCallback={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        left={<ArrowBackIcon />}
        leftCallback={() => {
          navigation.goBack();
        }}
        setHeight={setHeight}
      />
      <ChatsContainer roomID={roomID} headerHeight={height} />
    </KeyboardAvoidingView>
  );
}
