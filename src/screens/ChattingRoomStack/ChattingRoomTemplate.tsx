import React from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useQuery } from 'react-query';

import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { getMyData } from '@/apis/UserApi';
import { Header } from '@/components';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { IChatMessage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IUserDetail } from '@/types/user';

import ChatsContainer from './ChatsContainer';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const user_id = currentUser?.id;
  const room_id = route.params.id;

  const [chats, setChats] = React.useState<IChatMessage[]>([]);

  GatguWebsocket.useMessage<{
    type: string;
    data: {
      user: number;
      data: string;
    };
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
      <ChatsContainer chatList={chats} userID={user_id} roomID={room_id} />
    </KeyboardAvoidingView>
  );
}
