import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from 'native-base';

import { chatAPI } from '@/apis';
import { GSpace } from '@/components/Gatgu';
import { ParticipantStatus } from '@/enums';
import { useToaster } from '@/helpers/hooks';
import { fetchingParticipants } from '@/store/chatSlice';
import { palette, typo } from '@/styles';
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
    ? '입급확인을 하시겠습니까? 확인을 하면 바꾸실 수 없습니다.'
    : `입금확인 요쳥을 보내겠습니까? 요청을 보내면 다시 취소를 할 수 없습니다.`;
  const handlePress = () => {
    if (user) {
      setIsSubmitting(true);
      chatAPI
        .changeParticipantStatus(roomID, {
          user_id: user.participant.user_id,
          pay_status: isAuthor
            ? ParticipantStatus.pay_checked
            : ParticipantStatus.request_check_pay,
        })
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
    <View style={styles.centeredView}>
      <Modal
        visible={true}
        onRequestClose={() => onModalOpen(false)}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBox}>
          <Text style={{ ...typo.bigTitle, color: palette.dark }}>
            {header}
          </Text>
          <GSpace h={15} />
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={handlePress} isLoading={isSubmitting}>
              <Text>확인</Text>
            </Button>
            <GSpace w={10} />
            <Button onPress={() => onModalOpen(false)}>
              <Text>취소</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
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
