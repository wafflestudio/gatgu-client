import React from 'react';

import { Modal } from 'native-base';

import { GButton, GSpace } from '@/components/Gatgu';

interface ILogoutModalProps {
  onHide: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<ILogoutModalProps> = ({ onHide, onLogout }) => {
  return (
    <Modal isOpen size="lg">
      <Modal.Content>
        <Modal.Header>로그아웃 하시겠습니까?</Modal.Header>
        <Modal.Footer justifyContent="space-between" paddingRight={6}>
          <GButton
            theme="gray"
            variant="outlined"
            width="full"
            size="large"
            style={{ flex: 1 }}
            onPress={onHide}
          >
            취소
          </GButton>
          <GSpace w={10} />
          <GButton
            width="full"
            size="large"
            style={{ flex: 1 }}
            onPress={onLogout}
          >
            로그아웃
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
