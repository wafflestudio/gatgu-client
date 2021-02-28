import React, { useMemo } from 'react';
import Info from './Information';
import Grade from './Grade';
import Force from './Force';
import History from './HistoryList';
import { FootTerms } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { View } from 'react-native';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const info = useSelector((state: RootState) => state.user.info);

  const getColor = useMemo(() => {
    // FIXME: proper 수식
    return 'null';
  }, []);

  return (
    <>
      <Info profile={info} color={getColor} />
      <Grade />
      <Force />
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
