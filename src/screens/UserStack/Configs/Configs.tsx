import React from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import { Flex } from 'native-base';

import { StackActions, useNavigation } from '@react-navigation/core';

import { userAPI } from '@/apis';
import { removeRequesterToken } from '@/apis/apiClient';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import usePushNotification from '@/helpers/hooks/usePushNotification';
import { setLoginState } from '@/store/userSlice';
import { palette } from '@/styles';

import { ConfigLayout, IConfigLayoutItem } from '../components/ConfigLayout';
import { LogoutModal } from '../components/LogoutModal';
import ProposalModal from '../components/ProposalModal/ProposalModal';

const Configs: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toaster = useToaster();
  const { data: user } = useUserDetail();
  const { getFcmToken } = usePushNotification();

  const [isProposalModalOpen, setProposalModalOpen] = React.useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      const fcmToken = await getFcmToken();
      await userAPI.logout(fcmToken);
      dispatch(setLoginState(false));
      toaster.info('로그아웃되었습니다.');
      setLogoutModalOpen(false);
      removeRequesterToken();
      ObjectStorage.removeObject(asyncStoragekey.ACCESS_TOKEN);
      ObjectStorage.removeObject(asyncStoragekey.REFRESH_TOKEN);
      navigation.dispatch(StackActions.popToTop());
    } catch (err) {
      console.error((err as AxiosError<any>).response?.data);
      toaster.error('로그아웃에 실패했습니다.');
    }
  };
  const userItems: IConfigLayoutItem[] = [
    {
      label: '프로필 관리',
      onPress: () =>
        navigation.navigate('UserStack', {
          screen: 'ProfileModify',
        }),
    },
    {
      label: '알림 설정',
      onPress: () =>
        navigation.navigate('UserStack', {
          screen: 'NotificationConfig',
        }),
    },
  ];

  const etcItems: IConfigLayoutItem[] = [
    { label: '버전', rightItem: '1.0.0' },
    { label: '개발자 괴롭히기', onPress: () => setProposalModalOpen(true) },
    { label: '로그아웃', onPress: () => setLogoutModalOpen(true) },
  ];

  const renderProposalModal = () => {
    if (!user) return null;

    return (
      <ProposalModal
        isOpen={isProposalModalOpen}
        userId={user.id}
        email={user.email}
        onClose={() => {
          setProposalModalOpen(false);
        }}
      />
    );
  };

  const renderLogoutModal = () => {
    if (!isLogoutModalOpen) return;

    return (
      <LogoutModal
        onHide={() => setLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    );
  };

  return (
    <Flex flex={1} backgroundColor={palette.white}>
      <ConfigLayout title="사용자 설정" items={userItems} />
      <ConfigLayout title="기타" items={etcItems} />
      {renderLogoutModal()}
      {renderProposalModal()}
    </Flex>
  );
};

export default Configs;
