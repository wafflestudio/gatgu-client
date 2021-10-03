import React from 'react';

import { Modal } from 'native-base';
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';

import { palette } from '@/styles';

type GModalSize = 'small' | 'default' | 'big';

interface GModalContext {
  role?: GModalSize;
}

type GModalProps = IModalProps & {
  role?: GModalSize;
};

const GModalContext = React.createContext<GModalContext>({});
const useGmodalContext = () => React.useContext(GModalContext);

const GModalProvider: React.FC<GModalContext> = ({
  role = 'default',
  children,
}) => {
  return (
    <GModalContext.Provider value={{ role }}>{children}</GModalContext.Provider>
  );
};

const GModal: React.FC<GModalProps> = ({ children, role, ...props }) => {
  return (
    <GModalProvider>
      <Modal isOpen size="lg" {...props}>
        <Modal.Content pb="12px">
          {typeof props.onClose === 'function' ? (
            <Modal.CloseButton
              _pressed={{
                backgroundColor: palette.whiteGray,
              }}
            />
          ) : null}
          {children}
        </Modal.Content>
      </Modal>
    </GModalProvider>
  );
};

const GModalHeader: React.FC = ({ children }) => {
  const { role } = useGmodalContext();

  return <Modal.Header>{children}</Modal.Header>;
};

const GModalBody: React.FC = ({ children }) => {
  const { role } = useGmodalContext();

  return <Modal.Body pb="5px">{children}</Modal.Body>;
};

const GModalFooter: React.FC = ({ children }) => {
  const { role } = useGmodalContext();

  return <Modal.Footer pr={6}>{children}</Modal.Footer>;
};

export default Object.assign(GModal, {
  Header: GModalHeader,
  Body: GModalBody,
  Footer: GModalFooter,
});
