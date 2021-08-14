import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from 'react-query';

import { Flex, VStack } from 'native-base';

import { getMyData } from '@/apis/UserApi';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import FootTerms from '../../components/FootTerms';
import Force from './Force';
import History from './HistoryList';
import Info from './Information';

// Profile Component
const ProfileTemplate: React.FC = () => {
  const { isLoading, isError, data: info } = useQuery<IUserDetail>(
    [USER_DETAIL],
    () => getMyData().then((response) => response.data)
  );

  if (isLoading || isError) return null;

  if (!info) {
    return (
      <VStack flex="1" justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </VStack>
    );
  }

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
