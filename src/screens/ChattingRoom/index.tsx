import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import ChatsContainer from './ChatsContainer';
import messages from './mockChat';

export default function ChattingRoom(): JSX.Element {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ChatsContainer chatList={messages} />
    </KeyboardAvoidingView>
  );
}
