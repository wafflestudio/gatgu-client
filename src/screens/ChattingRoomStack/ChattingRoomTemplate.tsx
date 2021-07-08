import React from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { IChatMessage } from '@/types/chat';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();

  const [chats, setChats] = React.useState<IChatMessage[]>([]);

  GatguWebsocket.useMessage<{
    user: number;
    data: string;
  }>({
    onmessage: (e) => {
      setChats((prev) => [
        ...prev,
        {
          message: e.data.data,
          system: false,
          image: '',
          sent_at: new Date().toDateString(),
          sent_by: {
            nickname: `${e.data.user}`,
            picture: `https://placeimg.com/140/${e.data.user}/any`,
          },
        },
      ]);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title="채팅방"
        titleShown={true}
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
      <ChatsContainer chatList={chats} />
    </KeyboardAvoidingView>
  );
}
