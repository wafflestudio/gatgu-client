import React, { ReactNode, ReactNodeArray } from 'react';
import { View } from 'react-native';

import logo from '@/assets/icons/Logo';

import styles from './AppLoading.style';

interface IAppLoadingChildren {
  children: ReactNode;
}
function AppLoadingTemplate({ children }: IAppLoadingChildren): JSX.Element {
  return (
    <View style={styles.container}>
      <logo.mainLogo style={styles.mainLogo} />
      <logo.subLogo style={styles.subLogo} />
      {children}
    </View>
  );
}

export default AppLoadingTemplate;
