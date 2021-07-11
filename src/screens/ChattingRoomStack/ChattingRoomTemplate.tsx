import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { getChatMessages } from '@/apis/ChatApi';
import { Header } from '@/components';
import AppLoadingTemplate from '@/components/AppLoading';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { RootState } from '@/store';
import { IChatMessage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const id = route.params.id;

  const [chats, setChats] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [, setErrno] = useState(-100);

  const chatMessages = useSelector(
    (state: RootState) => state.chat.chatMessages
  );
  const loading = useSelector(
    (state: RootState) => state.chat.chatMessagesIsLoading
  );
  const error = useSelector(
    (state: RootState) => state.chat.chatMessagesHasError
  );
  const errNumber = useSelector(
    (state: RootState) => state.chat.chatMessagesErrorStatus
  );

  useEffect(() => {
    dispatch(getChatMessages(id));
  }, [dispatch]);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  useEffect(() => {
    setHasError(error);
  }, [error]);
  useEffect(() => {
    setErrno(errNumber);
  }, [errNumber]);

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
      {isLoading ? (
        <AppLoadingTemplate />
      ) : hasError ? null : (
        <ChatsContainer chatList={chatMessages} />
      )}
    </KeyboardAvoidingView>
  );
}
