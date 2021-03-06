import React from 'react';
import Info from './Information';
import Force from './Force';
import History from './HistoryList';
import { FootTerms } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { View } from 'react-native';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const info = useSelector((state: RootState) => state.user.info);
  console.debug(info);

  /*
  FIXME: @woohm402
    todo: 현재 버전에서는 안 쓰는 코드
    when: 이거 생길때,,

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
          todo: 위에 줄 아래 코드로 수정해야 함
          when: grade 생기는 버전에서

        <Info profile={info} color={myColor} />
        <Grade />
      */}
      <Force profile={info} />
      <History />
      {/*
        FIXME: @woohm402
          todo: 디자인 제대로 나오면 수정할게요 
          when: 최최최종 PR에서 하겠습니다
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
