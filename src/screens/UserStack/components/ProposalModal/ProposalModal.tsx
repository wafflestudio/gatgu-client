import React from 'react';

import { Modal, TextArea } from 'native-base';

import { userAPI } from '@/apis';
import { GButton } from '@/components/Gatgu';
import { useToaster } from '@/helpers/hooks';
import { palette } from '@/styles';

interface ProposalModalProps {
  isOpen: boolean;
  userId: number;
  email: string;
  onClose: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  userId,
  email,
  onClose,
}) => {
  const toaster = useToaster();

  const [content, setContent] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = () => {
    setSubmitting(true);

    userAPI
      .sendProposal({
        userId,
        email,
        content,
      })
      .then(() => {
        toaster.success('괴롭히기 성공!');
        onClose();
      })
      .catch(() => {
        toaster.error('괴롭히기 내용 전송에 실패하였습니다.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Modal avoidKeyboard isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton onPress={onClose} />
        <Modal.Header>개발자 괴롭히기</Modal.Header>
        <Modal.Body>
          <TextArea
            value={content}
            _focus={{ borderColor: palette.blue }}
            placeholder="건의 내용을 적어주세요"
            maxLength={1000}
            maxHeight={205}
            onChangeText={setContent}
          />
        </Modal.Body>
        <Modal.Footer>
          <GButton isLoading={submitting} onPress={handleSubmit}>
            제출하기
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ProposalModal;
