import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { articleAPI } from '@/apis';
import { ReportModal } from '@/components';
import { GText } from '@/components/Gatgu/';
import { ARTICLE_REPORT_REASONS } from '@/constants/article';
import { OrderStatus } from '@/enums';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { RootState } from '@/store';
import { changeOrderStatus } from '@/store/chatSlice';

import styles, { StyledArticleDrawerMenuText } from './Drawer.style';

const DrawerTemplate: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const toaster = useToaster();

  const currentUser = useUserDetail().data;

  const { order_chat, writer_id, article_id } = useSelector(
    (state: RootState) => state.article.currentArticle
  );
  const isMyArticle = writer_id === currentUser?.id;

  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [isReportModalSubmitting, setReportModalSubmitting] = useState(false);

  const toggleStatus = () => {
    // change status
    const temp =
      order_chat.order_status <= OrderStatus.Complete
        ? OrderStatus.Complete
        : OrderStatus.Pending;
    // TODO: @juimdpp
    // todo: 추후에 쓸 수 있을 듯
    // when: api 고칠 때 보기
    // const body = { ...chatInfo, orderStatus: temp };
    dispatch(changeOrderStatus(order_chat.id, temp));

    // Alert.alert(`"${temp}"으로 성공적으로 상태를 바꿨습니다!`);
  };

  const delArticle = () => {
    articleAPI
      .deleteArticle(article_id)
      .then(() => {
        toaster.success('삭제가 완료되었습니다.');
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.error(err);
        toaster.error('삭제하는데 실패했습니다.');
      });
  };

  const editArticle = () => {
    navigation.navigate('EditArticle', {
      id: article_id,
    });
  };

  const handleReportSubmit = (content: string) => {
    setReportModalSubmitting(true);
    articleAPI
      .postArticleReport(article_id, content)
      .then(() => {
        toaster.success('신고가 접수되었습니다.');
        setReportModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        toaster.error('에러가 발생했습니다. 다시 시도해주세요');
      })
      .finally(() => {
        setReportModalSubmitting(false);
      });
  };

  const renderParticipants = () => {
    /**
     * TODO:
     * order_chat.participant_profile 타입이 정해지면 구현하겠습니다.
     */
    return order_chat.participant_profile.map(() => <></>);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.upperContainer}>
          {isMyArticle ? (
            <>
              <StyledArticleDrawerMenuText
                touchable
                size="huge"
                color="blue"
                onPress={toggleStatus}
              >
                모집 완료하기
              </StyledArticleDrawerMenuText>
              <StyledArticleDrawerMenuText
                touchable
                size="huge"
                onPress={editArticle}
              >
                수정하기
              </StyledArticleDrawerMenuText>
              <StyledArticleDrawerMenuText
                touchable
                size="huge"
                onPress={delArticle}
              >
                삭제하기
              </StyledArticleDrawerMenuText>
            </>
          ) : null}
          <GText touchable size="huge" onPress={() => setReportModalOpen(true)}>
            신고하기
          </GText>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.lowerLabelText}>모집 인원 목록</Text>
          {renderParticipants()}
        </View>
      </View>

      {isReportModalOpen ? (
        <ReportModal
          reasons={ARTICLE_REPORT_REASONS}
          submitting={isReportModalSubmitting}
          onHide={() => setReportModalOpen(false)}
          onSubmit={handleReportSubmit}
        />
      ) : null}
    </DrawerContentScrollView>
  );
};

export default DrawerTemplate;
