import React from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from 'native-base';

import { userAPI } from '@/apis';
import { removeRequesterToken } from '@/apis/BaseInstance';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { useToaster } from '@/helpers/hooks';
import { setLoginState } from '@/store/userSlice';
import { palette } from '@/styles';

import { ConfigLayout, IConfigLayoutItem } from '../components/ConfigLayout';
import { LogoutModal } from '../components/LogoutModal';

const Configs: React.FC = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const toaster = useToaster();

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      dispatch(setLoginState(false));
      removeRequesterToken();
      ObjectStorage.removeObject(asyncStoragekey.ACCESS_TOKEN);
      ObjectStorage.removeObject(asyncStoragekey.REFRESH_TOKEN);

      toaster.info('로그아웃되었습니다.');
    } catch {
      toaster.error('로그아웃에 실패했습니다.');
    }
  };
  const userItems: IConfigLayoutItem[] = [
    { label: '계정 관리', onPress: () => toaster.info('노노노~') },
    { label: '신고 내역', onPress: () => toaster.info('노노노~') },
  ];

  const etcItems: IConfigLayoutItem[] = [
    { label: '개발자 괴롭히기', onPress: () => toaster.info('노노노~') },
    { label: '버전', onPress: () => toaster.info('노노노~') },
    { label: '로그아웃', onPress: () => setLogoutModalOpen(true) },
    { label: '탈퇴하기', onPress: () => toaster.info('노노노~') },
  ];

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
    </Flex>
  );
};

export default Configs;
