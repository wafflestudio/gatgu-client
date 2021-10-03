import React from 'react';

import { Modal } from 'native-base';
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';

type GModalSize = 'small' | 'default' | 'big';

interface GModalContext {
  size?: GModalSize;
  type: '';
}

const GModal: React.FC<IModalProps> = ({ children, ...props }) => {
  return (
    <Modal isOpen {...props}>
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
  return <Modal.Footer pr={6}>{children}</Modal.Footer>;
};

export default Object.assign(GModal, {
  Header: GModalHeader,
  Body: GModalBody,
  Footer: GModalFooter,
});
