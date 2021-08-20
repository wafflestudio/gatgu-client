import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';

import { Button, Modal } from 'native-base';

import { GButton } from '../Gatgu';
import styles from './Error.style';

interface IErrorProps {
  title: string;
  description: string;
  loading?: boolean;
  // errCallback을 넘겨야 한다.
  errCallback: () => void;
  navigation: any;
}

function Error({
  title,
  description,
  loading,
  errCallback,
  navigation,
}: IErrorProps): JSX.Element {
  const [show, setShow] = useState<boolean>(true);
  return (
    <View>
      {show && (
        <Modal isOpen size="md">
          <Modal.Content>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer
              pr={6}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <GButton
                width="default"
                size="default"
                onPress={() => {
                  setShow(false);
                  navigation.goBack();
                }}
              >
                확인
              </GButton>
              <GButton
                width="default"
                size="default"
                isLoading={loading}
                onPress={errCallback}
              >
                다시 시도
              </GButton>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
    </View>
  );
}

export default Error;
