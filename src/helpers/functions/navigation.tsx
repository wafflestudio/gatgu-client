import React from 'react';

import styled from 'styled-components/native';

import { createStackNavigator } from '@react-navigation/stack';

import BackIcon from '@/assets/icons/BackIcon/BackIcon.svg';

const StyledHeaderLeft = styled.View`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
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
      headerStyle: {
        height: 50,
      },
      headerBackTitleVisible: false,
      headerStatusBarHeight: 0,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackImage: () => (
        <StyledHeaderLeft>
          <BackIcon />
        </StyledHeaderLeft>
      ),
      headerRightContainerStyle: {
        marginRight: 6,
        marginLeft: 6,
      },
    },
  };

  return { ...rest, Navigator };
}) as typeof createStackNavigator;
