import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Modal } from 'native-base';

import { chatAPI } from '@/apis';
import { GButton, GSpace, GText } from '@/components/Gatgu';
import { ParticipantStatus } from '@/enums';
import { useToaster } from '@/helpers/hooks';
import { fetchingParticipants } from '@/store/chatSlice';
import { IChatUserProps } from '@/types/user';

interface IStatusModalProps {
  onModalOpen: (v: boolean) => void;
  isAuthor: boolean;
  roomID: number;
  user?: IChatUserProps;
}

function StatusModal({
  onModalOpen,
  isAuthor,
  roomID,
  user,
}: IStatusModalProps) {
  /**
     * if 방장:
        2-->3:
        입금확인 상태는 다시는 바꿀 수 없다고 모달 띄워주기
        if 확인 -> send api request
        else 취소
     * 일반 참가자:
        1-->2
        입금확인 요청을 보내겠습니까/ 모달 띄워주기
        확인이면 send api request
        그렇지 않으면 취소
     */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toaster = useToaster();
  const dispatch = useDispatch();
  const header = isAuthor
    ? '입금확인을 하시겠습니까?\n확인을 하면 바꾸실 수 없습니다.'
    : `입금확인 요쳥을 보내겠습니까?\n요청을 보내면 다시 취소를 할 수 없습니다.`;
  const handlePress = () => {
    if (user) {
      setIsSubmitting(true);

      const statusBody: { [x: string]: any } = {
        pay_status: isAuthor
          ? ParticipantStatus.pay_checked
          : ParticipantStatus.request_check_pay,
      };

      if (isAuthor) {
        statusBody.user_id = user?.id;
      }

      chatAPI
        .changeParticipantStatus(roomID, statusBody)
        .then(() => {
          toaster.success('성공적으로 상태를 바꿨습니다.');
          dispatch(fetchingParticipants(roomID));
          onModalOpen(false);
        })
        .catch((err) => {
          console.error('DRAWER MODAL', err);
          toaster.error('에러가 발생했습니다. 다시 시도해주세요');
        })
        .finally(() => {
          setIsSubmitting(false);
          onModalOpen(false);
        });
    }
  };
  return (
    <Modal isOpen onClose={() => onModalOpen(false)}>
      <Modal.Content pb="12px">
        <Modal.Body>
          <GText size={18} textAlign="center">
            {header}
          </GText>
        </Modal.Body>
        <Modal.Footer flexDirection="row" pr={6}>
          <GButton
            size="large"
            variant="outlined"
            style={{ flex: 1 }}
            onPress={() => onModalOpen(false)}
          >
            취소
          </GButton>
          <GSpace w={10} />
          <GButton
            size="large"
            style={{ flex: 1 }}
            onPress={handlePress}
            isLoading={isSubmitting}
          >
            확인
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalBox: {
    margin: 20,
    marginTop: 160,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StatusModal;
