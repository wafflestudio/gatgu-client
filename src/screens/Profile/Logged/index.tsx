import React, { useCallback } from 'react';
import Info from './Information';
import Grade from './Grade';
import History from './HistoryList';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IUserProps } from '@/types/user';
import { logout } from '@/store/userSlice';

export interface IProfileProps {
  profile: IUserProps;
}

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useNavigation();
  const info = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();

  const logoutReq = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <Info profile={info} />
      <Grade profile={info} />
      <History />
      <Button
        title="수정 창으로"
        onPress={() => navigation.navigate('ProfileModify')}
      />
      <Button title="로그아웃하기" onPress={logoutReq} />
    </>
  );
}

export default ProfileTemplate;
