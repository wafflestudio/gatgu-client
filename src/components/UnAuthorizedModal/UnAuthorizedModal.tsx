import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Modal } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

import { EUserStackScreens } from '@/screens/UserStack/UserStack';

import { GButton, GSpace, GText } from '../Gatgu';

interface IUnAuthorizedModalProps {
  isOpen?: boolean;
}

const UnAuthorizedModal: React.FC<IUnAuthorizedModalProps> = ({ isOpen }) => {
  const navigation = useNavigation();

  return (
    <Modal isOpen={isOpen} size="md">
      <Modal.Content>
        <Modal.Header flexDirection="row" alignItems="center">
          <AntDesign size={25} name="warning" />
          <GSpace w={10} />
          로그인 필요
        </Modal.Header>
        <Modal.Body>
          <GText size={18}>로그인 이후 사용 가능한 기능입니다.</GText>
        </Modal.Body>
        <Modal.Footer pr={6}>
          <GButton
            width="full"
            size="large"
            onPress={() => {
              navigation.dispatch(
                StackActions.push('MainStack', {
                  screen: 'UserStack',
                })
              );

              navigation.navigate('MainStack', {
                screen: 'UserStack',
                params: {
                  screen: EUserStackScreens.Login,
                },
              });
            }}
          >
            로그인 하러 가기
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default UnAuthorizedModal;
