import { Button } from '@/components';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Drawer.style';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { RootState } from '@/store';
import { articleAPI, chatAPI, userAPI } from '@/apis';
import { AxiosError, AxiosResponse } from 'axios';
import { createError } from '@/helpers/functions';
import { IChattingRoom } from '@/types/chat';

const [Error] = createError();

function DrawerTemplate(props: any): JSX.Element {
  const [chatInfo, setChatInfo] = useState<IChattingRoom>();
  const [hasError, setError] = useState(false);
  const navigation = useNavigation();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );

  useEffect(() => {
    if (currentArticle.id !== '0') {
      const id = parseInt(currentArticle.id);
      chatAPI
        .getChatInfo(id)
        .then((response: AxiosResponse) => {
          setChatInfo(response.data[0]);
          setError(false);
        })
        .catch((err: AxiosError) => {
          setError(true);
        });
    }
  }, [currentArticle]);

  const toggleStatus = () => {
    // change status
    if (chatInfo !== undefined) {
      const temp = chatInfo.orderStatus === '~ing' ? 'done' : '~ing';
      const body = { ...chatInfo, orderStatus: temp as 'done' | '~ing' };
      chatAPI
        .changeStatus(chatInfo.article, body)
        .then(() => {
          setChatInfo(body);
          alert(`Successfully changed status to "${temp}"`);
        })
        .catch((err: AxiosError) => {
          alert("Couldn't change status");
        });
    }
  };

  const delArticle = () => {
    if (chatInfo !== undefined) {
      articleAPI
        .deleteArticle(chatInfo.id)
        .then((response: AxiosResponse) => {
          alert('Successfully deleted');
          navigation.navigate('Home');
        })
        .catch((err: AxiosError) => {
          alert("Couldn't delete article");
        });
    }
  };

  const participants = chatInfo?.participant.map((id, index) => {
    // userAPI.getInfo(id)
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { params: id })}
        >
          <Text>Image</Text>
        </TouchableOpacity>
        <Text>Participant {id}</Text>
      </View>
    );
  });

  return (
    <DrawerContentScrollView {...props}>
      <Button title="모집 완료하기" onPress={toggleStatus} />
      <Button title="수정하기" onPress={() => alert('navigate to edit page')} />
      <Button title="삭제하기" onPress={delArticle} />
      <Button title="신고하기" onPress={() => alert('not yet: 신고하기')} />
      <Text>------------------</Text>
      <Text>모집인원 목록</Text>
      {participants}
    </DrawerContentScrollView>
  );
}

export default DrawerTemplate;
