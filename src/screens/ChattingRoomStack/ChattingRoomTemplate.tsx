import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

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
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        backgroundColor: 'yellow',
        justifyContent: 'space-between',
      }}
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
    </View>
  );
}
