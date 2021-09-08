import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Flex, VStack } from 'native-base';

import { useUserDetail } from '@/helpers/hooks/api';

import FootTerms from '../../components/FootTerms';
import Force from './Force';
import History from './HistoryList';
import Info from './Information';

// Profile Component
const ProfileTemplate: React.FC = () => {
  const { isLoading, isError, data: info } = useUserDetail();

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
        <Info
          nickname={info.userprofile.nickname}
          picture={info.userprofile.picture}
          trading_address={info.userprofile.trading_address}
        />
        <Force
          hosted_count={info.hosted_count}
          participated_count={info.participated_count}
        />
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
