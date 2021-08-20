import React, { useState } from 'react';
import { View } from 'react-native';

import { Modal } from 'native-base';

import { GButton } from '../Gatgu';

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
    <View>
      <Modal isOpen size="md">
        <Modal.Content>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>{description}</Modal.Body>
          <Modal.Footer
            pr={6}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
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
    </View>
  );
}

export default Error;
