import React from 'react';

import { Modal } from 'native-base';
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';

import { palette } from '@/styles';

import { GButton } from '../GButton';
import { GSpace } from '../GSpace';

type GModalSize = 'small-confirm' | 'default' | 'big';

interface GModalContext {
  role?: GModalSize;
}

type GModalProps = IModalProps & {
  role?: GModalSize;
};

interface GModalFooterProps {
  buttons?: {
    content: React.ReactNode | string;
    onPress: () => void;
    isLoading?: boolean;
  }[];
}

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
    <GModalProvider role={role}>
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

  return (
    <Modal.Header
      alignItems={role === 'small-confirm' ? 'center' : 'flex-start'}
    >
      {children}
    </Modal.Header>
  );
};

const GModalBody: React.FC = ({ children }) => {
  return <Modal.Body pb="5px">{children}</Modal.Body>;
};

const GModalFooter: React.FC<GModalFooterProps> = ({ buttons, children }) => {
  const renderFooterChildren = () => {
    if (buttons) {
      if (buttons.length === 1) {
        const { isLoading, onPress, content } = buttons[0];
        return (
          <GButton
            width="full"
            size="large"
            isLoading={isLoading}
            onPress={onPress}
          >
            {content}
          </GButton>
        );
      } else if (buttons.length === 2) {
        return (
          <>
            <GButton
              theme="gray"
              variant="outlined"
              width="full"
              size="large"
              style={{ flex: 1 }}
              isLoading={buttons[0].isLoading}
              onPress={buttons[0].onPress}
            >
              {buttons[0].content}
            </GButton>
            <GSpace w={10} />
            <GButton
              width="full"
              size="large"
              style={{ flex: 1 }}
              isLoading={buttons[1].isLoading}
              onPress={buttons[1].onPress}
            >
              {buttons[1].content}
            </GButton>
          </>
        );
      }
    }
    return children;
  };

  return <Modal.Footer pr={6}>{renderFooterChildren()}</Modal.Footer>;
};

export default Object.assign(GModal, {
  Header: GModalHeader,
  Body: GModalBody,
  Footer: GModalFooter,
});
