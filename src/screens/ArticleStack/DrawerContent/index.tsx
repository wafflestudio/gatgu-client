import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosResponse } from 'axios';

import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { articleAPI, userAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { Button, Profile } from '@/components';
import { OrderStatus } from '@/enums';
import { USER_DETAIL } from '@/queryKeys';
import { RootState } from '@/store';
import { getChatInfo, changeOrderStatus } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IChattingRoom } from '@/types/chat';
import { IUserDetail, IUserSimple } from '@/types/user';

import styles from './Drawer.style';

const DrawerTemplate: React.FC<any> = (props) => {
  const [chatInfo] = useState<IChattingRoom>();
  const [participants, setParticipants] = useState<JSX.Element[]>([]);
  const [hasError, setError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentArticle = useSelector(
    (state: RootState) => state.article.currentArticle
  );

  const loggedIn = !!useSelector((state: RootState) => state.user.accessToken);
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  useEffect(() => {
    if (currentArticle.article_id !== 0) {
      const id = currentArticle.article_id;
      dispatch(getChatInfo(id));
    }
  }, [dispatch, currentArticle]);

  useEffect(() => {
    if (chatInfo?.id !== 0) {
      let tempArr: JSX.Element[] = [];
      chatInfo?.participant_profile.map((part, ind) => {
        userAPI
          .getOtherUserData(part.id) // TODO: @juimdpp 여기 부분 getArticleSum 처럼 getUserSum 해놓고 싶은데, 베포 되고 나서 요청할게요
          .then((response: AxiosResponse<IUserSimple>) => {
            const user = response.data.userprofile;
            tempArr = tempArr.concat(<Profile key={ind} {...user} />);
          })
          .then(() => {
            setParticipants(tempArr);
          })
          .catch(() => {
            setError(true);
          });
      });
    }
  }, [chatInfo]);
  const toggleStatus = () => {
    // change status
    if (chatInfo !== undefined) {
      const temp =
        chatInfo.order_status <= OrderStatus.Complete
          ? OrderStatus.Complete
          : OrderStatus.Pending;
      // TODO: @juimdpp
      // todo: 추후에 쓸 수 있을 듯
      // when: api 고칠 때 보기
      // const body = { ...chatInfo, orderStatus: temp };
      dispatch(changeOrderStatus(chatInfo.id, temp));

      // Alert.alert(`"${temp}"으로 성공적으로 상태를 바꿨습니다!`);
    }
  };

  const delArticle = () => {
    if (chatInfo !== undefined) {
      articleAPI
        .deleteArticle(chatInfo.id)
        .then(() => {
          Alert.alert('삭제가 완료되었습니다.');
          navigation.navigate('Home');
        })
        .catch(() => {
          Alert.alert('삭제하는데 실패했습니다.');
        });
    }
  };

  const editArticle = () => {
    if (!loggedIn) {
      Alert.alert('로그인을 해주세요');
    } else {
      if (currentUser && currentUser['id'] === currentArticle.writer_id) {
        navigation.navigate('EditArticle', {
          id: currentArticle.article_id,
        });
      } else {
        Alert.alert('타인의 글을 수정할 수 없습니다.');
      }
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {hasError ? (
        <Text>Error</Text>
      ) : (
        <View>
          <View style={styles.upperContainer}>
            <Button
              title="모집 완료하기"
              onPress={toggleStatus}
              textStyle={[styles.upperLabelText, { color: palette.blue }]}
            />
            <Button
              title="수정하기"
              onPress={editArticle}
              textStyle={styles.upperLabelText}
            />
            <Button
              title="삭제하기"
              onPress={delArticle}
              textStyle={styles.upperLabelText}
            />
            <Button
              title="신고하기"
              onPress={() => Alert.alert('not yet: 신고하기')}
              textStyle={styles.upperLabelText}
            />
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.lowerLabelText}>모집 인원 목록</Text>
            {participants}
          </View>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

export default DrawerTemplate;
