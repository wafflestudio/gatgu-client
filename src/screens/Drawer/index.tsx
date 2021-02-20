import { Button } from '@/components';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './Drawer.style';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ArticleDrawerParamList } from '@/types/navigation';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { RootState } from '@/store';
import { articleAPI, chatAPI } from '@/apis';
import { AxiosError, AxiosResponse } from 'axios';
import { createError } from '@/helpers/functions';
import { IChattingRoom } from '@/types/chat';
import { FlatList } from 'react-native-gesture-handler';
import { changeStatus } from '@/apis/ChatApi';
import routes from '@/helpers/routes';

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
      console.log(id);
      chatAPI
        .getChatInfo(id)
        .then((response: AxiosResponse) => {
          console.log(response.data[0]);
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
    console.log(chatInfo);
    if (chatInfo !== undefined) {
      const temp = chatInfo.orderStatus === '~ing' ? 'done' : '~ing';
      const body = { ...chatInfo, orderStatus: temp as 'done' | '~ing' };
      chatAPI
        .changeStatus(chatInfo.article, body)
        .then(() => {
          console.log('hello');
          setChatInfo(body);
          alert(`Successfully changed status to "${temp}"`);
        })
        .catch((err: AxiosError) => {
          console.log('by');
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
          navigation.navigate(routes.Home.name);
        })
        .catch((err: AxiosError) => {
          alert("Couldn't delete article");
        });
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="거래 완료하기" onPress={toggleStatus} />
      <Button title="수정하기" onPress={() => alert('navigate to edit page')} />
      <Button title="삭제하기" onPress={delArticle} />
      <Button title="신고하기" onPress={() => alert('not yet: 신고하기')} />
      <Text>------------------</Text>
      <Text>모집인원 목록</Text>
      {/* <FlatList
      /> */}
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

export default DrawerTemplate;
