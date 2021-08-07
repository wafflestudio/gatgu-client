import React from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title="채팅방"
        // FIXME: @ssu1018
        // 더보기 아이콘으로 수정
        // when: #118 이슈 해결할 때
        right={<Text>더보기</Text>}
        rightCallback={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        // FIXME: @ssu1018
        // 뒤로가기 아이콘으로 수정
        // when: #118 이슈 해결할 때
        left={<Text>뒤로가기</Text>}
        leftCallback={() => {
          navigation.goBack();
        }}
      />
      <ChatsContainer />
    </KeyboardAvoidingView>
  );
}
