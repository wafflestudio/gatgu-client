import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Modal } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

import { EUserStackScreens } from '@/screens/UserStack/UserStack';

import { GButton, GModal, GSpace, GText } from '../Gatgu';

interface IUnAuthorizedModalProps {
  isOpen?: boolean;
}

const UnAuthorizedModal: React.FC<IUnAuthorizedModalProps> = ({ isOpen }) => {
  const navigation = useNavigation();

  return (
    <GModal isOpen={isOpen} role="notice">
      <GModal.Header flexDirection="row" alignItems="center">
        <AntDesign size={25} name="warning" />
        <GSpace w={10} />
        로그인 필요
      </GModal.Header>
      <GModal.Body>
        <GText size={18}>로그인 이후 사용 가능한 기능입니다.</GText>
      </GModal.Body>
      <GModal.Footer
        buttons={[
          {
            onPress: () => {
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
            },
            content: '로그인 하러 가기',
          },
        ]}
      />
    </GModal>
  );
};

export default UnAuthorizedModal;
