import React from 'react';
import { View, Image } from 'react-native';
import styles from './AppLoading.style';

function AppLoadingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        style={styles.mainLogo}
        source={require('@/assets/Logo/Logo13.svg')}
      />
      <Image
        style={styles.subLogo}
        source={require('@/assets/Logo/Logo15.svg')}
      />
    </View>
  );
}

export default AppLoadingTemplate;
