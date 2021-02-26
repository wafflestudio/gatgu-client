import React, { useCallback } from 'react';
import Info from './Information';
import Grade from './Grade';
import History from './HistoryList';
import { Button, FootTerms } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IUserProps } from '@/types/user';
import { logout } from '@/store/userSlice';
import { View } from 'react-native';

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
      {/* FIXME: 디자인 제대로 나오면 수정할게요 */}
      <View
        style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
      >
        <FootTerms />
      </View>
    </>
  );
}

export default ProfileTemplate;
