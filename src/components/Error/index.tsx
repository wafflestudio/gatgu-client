import React, { useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';

import { Modal } from 'native-base';

import { GButton } from '../Gatgu';
import styles from './Error.style';

interface IErrorProps {
  title: string;
  description: string;
  loading?: boolean;
  // errCallback을 넘겨야 한다.
  errCallback: () => void;
}

function Error({
  title,
  description,
  loading,
  errCallback,
}: IErrorProps): JSX.Element {
  return (
    <Modal isOpen size="md">
      <Modal.Content>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer pr={6}>
          <GButton
            width="full"
            size="large"
            isLoading={loading}
            onPress={errCallback}
          >
            다시 시도
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default Error;
