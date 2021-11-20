import React from 'react';

import { Modal } from 'native-base';

import { GButton, GSpace } from '@/components/Gatgu';

interface ILogoutModalProps {
  onHide: () => void;
  onLogout: () => Promise<void>;
}

const LogoutModal: React.FC<ILogoutModalProps> = ({ onHide, onLogout }) => {
  const [isLoading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await onLogout();
    setLoading(false);
  };

  return (
    <Modal isOpen size="lg">
      <Modal.Content pb="12px">
        <Modal.Header alignItems="center">로그아웃 하시겠습니까?</Modal.Header>
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
            isLoading={isLoading}
            onPress={handleLogout}
          >
            로그아웃
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
