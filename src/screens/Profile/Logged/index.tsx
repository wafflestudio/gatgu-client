import React from 'react';
import { Alert, View } from 'react-native';
import { useQuery } from 'react-query';

import { getMyData } from '@/apis/UserApi';
import { FootTerms } from '@/components';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import Force from './Force';
import History from './HistoryList';
import Info from './Information';

// Profile Component
const ProfileTemplate: React.FC = () => {
  const userQuery = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );

  if (userQuery.isLoading || userQuery.isError) return null;
  if (!userQuery.data) {
    Alert.alert('유저 데이터를 불러오는 데 실패했습니다.');
    return null;
  }

  const info = userQuery.data;

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
};

export default ProfileTemplate;
