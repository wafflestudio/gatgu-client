import React from 'react';

import { Modal } from 'native-base';

type GModalSize = 'small' | 'default' | 'big';

interface GModalContext {
  size?: GModalSize;
  type: '';
}

const GModal: React.FC = ({ children }) => {
  return (
    <Modal>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

const GModalHeader: React.FC = ({ children }) => {
  return <Modal.Header>{children}</Modal.Header>;
};

const GModalBody: React.FC = ({ children }) => {
  return <Modal.Body>{children}</Modal.Body>;
};

const GModalFooter: React.FC = ({ children }) => {
  return <Modal.Content>{children}</Modal.Content>;
};

export default Object.assign(GModal, {
  Header: GModalHeader,
  Body: GModalBody,
  Footer: GModalFooter,
});
