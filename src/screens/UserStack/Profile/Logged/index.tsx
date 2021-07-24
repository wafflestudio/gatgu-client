import React from 'react';
import { Alert, View } from 'react-native';
import { useQuery } from 'react-query';

import { Flex } from 'native-base';

import { getMyData } from '@/apis/UserApi';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import FootTerms from '../../components/FootTerms';
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
    <Flex justifyContent="space-between" h="100%">
      <View>
        <Info profile={info} />
        <Force profile={info} />
        <History />
      </View>
      <View
        style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
      >
        <FootTerms />
      </View>
    </Flex>
  );
};

export default ProfileTemplate;
