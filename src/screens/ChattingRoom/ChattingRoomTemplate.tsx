import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { HeaderIcon } from '@/assets/Header';
import { Header } from '@/components';

import ChatsContainer from './ChatsContainer';
import Styles from './ChattingRoom.style';
import messages from './mockChat';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView style={Styles.keyboardAvoidView}>
      <Header
        title="채팅방"
        titleShown={true}
        right={<HeaderIcon.Drawer />}
        rightCallback={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        left={<HeaderIcon.BackIcon />}
        leftCallback={() => {
          navigation.goBack();
        }}
      />
      <ChatsContainer chatList={messages} />
    </KeyboardAwareScrollView>
  );
}
