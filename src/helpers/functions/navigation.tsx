import React from 'react';

import styled from 'styled-components/native';

import { createStackNavigator } from '@react-navigation/stack';

import BackIcon from '@/assets/icons/BackIcon/BackIcon.svg';

const StyledHeaderLeft = styled.View`
  margin-left: 6px;
  width: 38px;
  align-items: center;
`;

export const createGatguStackNavigator = (<
  T extends Record<string, Record<string, any> | undefined>
>(
  ...args: Parameters<typeof createStackNavigator>
) => {
  const { Navigator, ...rest } = createStackNavigator<T>(...args);

  Navigator.defaultProps = {
    screenOptions: {
      headerBackTitleVisible: false,
      headerStatusBarHeight: 0,

      headerBackImage: () => (
        <StyledHeaderLeft>
          <BackIcon />
        </StyledHeaderLeft>
      ),
    },
  };

  return { ...rest, Navigator };
}) as typeof createStackNavigator;
