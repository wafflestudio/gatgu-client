import React from 'react';
import { View } from 'react-native';

import logo from '@/assets/Logo';

import styles from './AppLoading.style';

function AppLoadingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <logo.mainLogo style={styles.mainLogo} />
      <logo.subLogo style={styles.subLogo} />
    </View>
  );
}

export default AppLoadingTemplate;
