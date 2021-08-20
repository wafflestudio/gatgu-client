import React from 'react';

import { Box, Image, Text, VStack } from 'native-base';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { palette, typo } from '@/styles';

import EmptyTemplateBody from './EmptyTemplateBody';

const EmptyTemplate: React.FC = ({ children }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <VStack
      minHeight="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={palette.whiteGray}
      pb={bottomTabBarHeight}
    >
      <Image
        source={require('@/assets/images/empty.png')}
        alt="no search result"
      />
      {children}
    </VStack>
  );
};

export default Object.assign(EmptyTemplate, { Body: EmptyTemplateBody });
