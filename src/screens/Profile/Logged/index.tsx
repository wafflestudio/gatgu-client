import React from 'react';
import Info from './Information';
import Grade from './Grade';
import History from './HistoryList';
import { FootTerms } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IUserProps } from '@/types/user';
import { View } from 'react-native';

export interface IProfileProps {
  profile: IUserProps;
}

// Profile Component
function ProfileTemplate(): JSX.Element {
  const info = useSelector((state: RootState) => state.user.info);

  return (
    <>
      <Info profile={info} />
      <Grade profile={info} />
      <History />
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
