import { Button } from '@/components';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './Drawer.style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ArticleDrawerParamList } from '@/types/navigation';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { RootState } from '@/store';
import { articleAPI } from '@/apis';

function DrawerTemplate(props: any): JSX.Element {
  const route = useRoute<RouteProp<ArticleDrawerParamList, 'ArticlePage'>>();
  const id = route.params.id;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="거래 완료하기" onPress={() => alert('hello')} />
      <Button title="수정하기" onPress={() => alert('hello')} />
      <Button title="삭제하기" onPress={() => alert('hello')} />
      <Button title="신고하기" onPress={() => console.log(route.params)} />
      <Text>------------------</Text>
      <Text>모집인원 목록</Text>
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

export default DrawerTemplate;
