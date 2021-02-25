import { Button } from '@/components';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
import { palette } from '@/styles';
import { IUserProps, IUserSumProps } from '@/types/user';

interface ElementArr {
  list: JSX.Element[];
}

const [Error] = createError();

function DrawerTemplate(props: any): JSX.Element {
  const [chatInfo, setChatInfo] = useState<IChattingRoom>();
  const [participants, setParticipants] = useState<JSX.Element[]>([]);
  const [tem, setTemp] = useState<number>(0);
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

  useEffect(() => {
    if (chatInfo?.id !== 0) {
      let tempArr: JSX.Element[] = [];
      chatInfo?.participant.map((part, ind) => {
        userAPI
          .getUser(part) // 여기 부분 getArticleSum 처럼 getUserSum 해놓고 싶은데, 베포 되고 나서 요청할게요
          .then((response: AxiosResponse<IUserProps>) => {
            const user = response.data.userprofile;
            tempArr = tempArr.concat(
              <View key={ind}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Profile', { params: user.profile_id })
                  }
                >
                  <Image source={{ uri: user.picture }} style={styles.image} />
                </TouchableOpacity>
                <Text>Participant {user.nickname}</Text>
              </View>
            );
          })
          .then(() => {
            setParticipants(tempArr);
          })
          .catch((err: AxiosError) => {
            console.log(err);
            setError(true);
          });
      });
    }
  }, [chatInfo]);

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

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.upperContainer}>
        <Button
          title="모집 완료하기"
          onPress={toggleStatus}
          textStyle={[styles.upperLabelText, { color: palette.blue }]}
        />
        <Button
          title="수정하기"
          onPress={() => alert('navigate to edit page')}
          textStyle={styles.upperLabelText}
        />
        <Button
          title="삭제하기"
          onPress={delArticle}
          textStyle={styles.upperLabelText}
        />
        <Button
          title="신고하기"
          onPress={() => alert('not yet: 신고하기')}
          textStyle={styles.upperLabelText}
        />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.lowerLabelText}>모집 인원 목록</Text>
        {participants}
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerTemplate;
