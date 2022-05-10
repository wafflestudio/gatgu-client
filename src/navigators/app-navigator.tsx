import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {AppStack} from './app-stack';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const navigationRef = createNavigationContainerRef();

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
