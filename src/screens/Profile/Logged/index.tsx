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
  console.log(info);

  /*
  FIXME: @woohm402
    현재 버전에서는 안 씀

  const { point } = info.userprofile;

  const myColor = useMemo(() => {
    return `#555555`;
  }, [point]);
  */

  return (
    <>
      <Info profile={info} />
      {/*
        FIXME: @woohm402
        위에 줄 이걸로 수정해야 함
        <Info profile={info} color={myColor} />
        <Grade />
      */}
      <Force profile={info} />
      <History />
      {/*
        FIXME: @woohm402
        디자인 제대로 나오면 수정할게요 
      */}
      <View
        style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
      >
        <FootTerms />
      </View>
    </>
  );
}

export default ProfileTemplate;
