import React, { useState } from 'react';

import { Button, Modal } from 'native-base';

import { chatAPI } from '@/apis';
import { ParticipantStatus } from '@/enums';
import { useToaster } from '@/helpers/hooks';
import { IChatUserProps } from '@/types/user';

interface IStatusModalProps {
  onClose: () => void;
  isAuthor: boolean;
  roomID: number;
  user?: IChatUserProps;
}

function StatusModal({ onClose, isAuthor, roomID, user }: IStatusModalProps) {
  /**
     * if 방장:
        2-->3:
        입금확인 상태는 다시는 바꿀 수 없다고 모달 띄워주기
        if 확인 -> send api request
        else 취소
     * 일반 참가자:
        1-->2 && 2 --> 1
        입금확인 요청을 보내겠습니까/취소하겠습니까 모달 띄워주기
        확인이면 send api request
        그렇지 않으면 취소
     */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toaster = useToaster();
  const isSend = user?.pay_status === 1 ? '보내' : '취소하';
  const header = isAuthor
    ? '입급확인을 하시겠습니까? 확인을 하면 바꾸실 수 없습니다.'
    : `입금확인 요쳥을 ${isSend}겠습니까?`;
  const handlePress = () => {
    if (user) {
      setIsSubmitting(true);
      chatAPI
        .changeParticipantStatus(roomID, {
          participant_id: user.id,
          pay_status: isAuthor
            ? ParticipantStatus.pay_checked
            : user.pay_status === ParticipantStatus.before_pay
            ? ParticipantStatus.request_check_pay
            : ParticipantStatus.before_pay,
        })
        .then(() => {
          toaster.success('성공적으로 상태를 바꿨습니다.');
          onClose();
        })
        .catch((err) => {
          console.log('DRAWER MODAL', err);
          toaster.error('에러가 발생했습니다. 다시 시도해주세요');
        })
        .finally(() => {
          setIsSubmitting(false);
          onClose();
        });
    }
  };
  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Content>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Footer>
          <Button onPress={handlePress} isLoading={isSubmitting}>
            확인
          </Button>
          <Button onPress={onClose}>취소</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default StatusModal;
