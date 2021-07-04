import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from 'react-query';

import firestore from '@react-native-firebase/firestore';
import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { getMyData } from '@/apis/UserApi';
import { Header } from '@/components';
import { USER_DETAIL } from '@/queryKeys';
import { IChatMessage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IUserDetail } from '@/types/user';

import ChatsContainer from './ChatsContainer';
import messageList from './mockChat';

export default function ChattingRoom(): JSX.Element {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(messageList);
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const id = `${route.params.id}`;
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  useEffect(() => {
    const messageListener = firestore()
      .collection('THREADS')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('sent_at', 'asc')
      .onSnapshot((querySnapShot) => {
        const msgs = querySnapShot.docs.map((message) => {
          const firebaseData = message.data();
          const data = {
            _id: message.id,
            sent_at: '',
            image: '',
            message: '',
            system: true,
            ...firebaseData,
          } as IChatMessage;
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              // name: firebaseData.user.email
            };
          }
          return data;
        });
        setMessages(msgs);
      });
    return () => messageListener();
  }, []);

  async function handleSend(newMessage: string) {
    const data = {
      message: newMessage,
      sent_at: new Date().toISOString(),
      image: '',
      system: false,
    } as IChatMessage;
    if (currentUser)
      data.user = {
        _id: `${currentUser.id}`,
        picture: currentUser.userprofile.picture,
        username: currentUser.username,
      };
    firestore().collection('THREADS').doc(id).collection('MESSAGES').add(data);
    await firestore()
      .collection('THREADS')
      .doc(id)
      .set(
        {
          latestMessage: {
            message: newMessage,
            sent_at: new Date().toISOString(),
            image: '',
            system: false,
          },
        },
        { merge: true }
      );
  }

  async function handlePress() {
    firestore()
      .collection('THREADS')
      .doc('bla')
      .set({
        name: 'res.data.title',
        latestMessage: {
          image: '',
          sent_at: new Date().getTime(),
          message: `Chatting room created.`,
          system: true,
        },
      });
    await firestore()
      .collection('THREADS')
      .doc('bla')
      .collection('MESSAGES')
      .add({
        image: '',
        message: `Chatting room created.`,
        sent_at: new Date().getTime(),
        system: true,
      });
  }

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
      <ChatsContainer chatList={messages} handleSend={handleSend} />
      <TouchableOpacity onPress={handlePress}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
