import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'native-base';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { articleAPI } from '@/apis';
import { ReportModal } from '@/components';
import { GButton, GSpace, GText } from '@/components/Gatgu/';
import { ARTICLE_REPORT_REASONS } from '@/constants/article';
import { RESET_SCREEN } from '@/constants/navigateOption';
import { ArticleStatus } from '@/enums';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';

import styles, { StyledArticleDrawerMenuText } from './Drawer.style';

const DrawerTemplate: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const toaster = useToaster();
  const currentUser = useUserDetail().data;

  const { writer, article_id, article_status, order_chat } = useSelector(
    (state: RootState) => state.article.currentArticle
  );

  const isMyArticle = writer?.id === currentUser?.id;

  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [isReportModalSubmitting, setReportModalSubmitting] = useState(false);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const [isStatusChangeModalOpen, setStatusChangeModalOpen] = useState(false);
  const [isStatusChanging, setStatusChanging] = useState(false);

  const refreshArticle = () => {
    dispatch(getSingleArticle(article_id));
  };

  const changeArticleStatus = () => {
    setStatusChanging(true);

    articleAPI
      .patchArticle(article_id, {
        article_status: ArticleStatus.Complete,
      })
      .then(() => {
        setStatusChangeModalOpen(false);
        toaster.success('글 상태 변경을 완료되었습니다.');
        refreshArticle();
      })
      .catch(() => {
        toaster.error('글 상태 변경에 실패했습니다.');
      })
      .finally(() => {
        setStatusChanging(false);
      });
  };

  const delArticle = () => {
    setDeleting(true);

    articleAPI
      .deleteArticle(article_id)
      .then(() => {
        toaster.success('삭제가 완료되었습니다.');
        setDeleteModalOpen(false);
        navigation.navigate('Home', {
          navigateFlag: RESET_SCREEN,
        });
      })
      .catch((e) => {
        console.error('DrawerContent', e);
        toaster.error('삭제하는데 실패했습니다.');
      })
      .finally(() => {
        setDeleting(false);
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

  const renderDeleteModal = () => {
    return (
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Modal.Content>
          <Modal.Header>글을 삭제하시겠습니까?</Modal.Header>
          <Modal.Footer pr={6}>
            <GButton
              width="full"
              variant="outlined"
              size="large"
              style={{ flex: 1 }}
              onPress={() => setDeleteModalOpen(false)}
            >
              취소
            </GButton>
            <GSpace w={10} />
            <GButton
              width="full"
              size="large"
              style={{ flex: 1 }}
              isLoading={isDeleting}
              onPress={delArticle}
            >
              삭제하기
            </GButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const renderStatusChangeModal = () => {
    return (
      <Modal
        isOpen={isStatusChangeModalOpen}
        onClose={() => setStatusChangeModalOpen(false)}
      >
        <Modal.CloseButton />
        <Modal.Content>
          <Modal.Header>거래 완료하시겠습니까?</Modal.Header>
          <Modal.Footer pr={6} justifyContent="space-between">
            <GButton
              width="full"
              variant="outlined"
              size="large"
              style={{ flex: 1 }}
              onPress={() => setStatusChangeModalOpen(false)}
            >
              취소
            </GButton>
            <GSpace w={10} />
            <GButton
              width="full"
              size="large"
              style={{ flex: 1 }}
              isLoading={isStatusChanging}
              onPress={changeArticleStatus}
            >
              거래 완료하기
            </GButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const renderArticleStatusChangeText = () => {
    if (article_status.progress_status === ArticleStatus.Complete) {
      return null;
    }

    return (
      <StyledArticleDrawerMenuText
        touchable
        size={18}
        color="blue"
        onPress={() => setStatusChangeModalOpen(true)}
      >
        거래 완료하기
      </StyledArticleDrawerMenuText>
    );
  };

  const renderParticipants = () => {
    return order_chat?.participant_profile.map(() => <></>);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.upperContainer}>
          {isMyArticle ? (
            <>
              {renderArticleStatusChangeText()}
              <StyledArticleDrawerMenuText
                touchable
                size={18}
                onPress={editArticle}
              >
                수정하기
              </StyledArticleDrawerMenuText>
              <StyledArticleDrawerMenuText
                touchable
                size={18}
                onPress={() => setDeleteModalOpen(true)}
              >
                삭제하기
              </StyledArticleDrawerMenuText>
            </>
          ) : null}
          <GText touchable size={18} onPress={() => setReportModalOpen(true)}>
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

      {renderStatusChangeModal()}
      {renderDeleteModal()}
    </DrawerContentScrollView>
  );
};

export default DrawerTemplate;
