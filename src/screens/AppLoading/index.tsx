import React from 'react';
import { View, Text } from 'react-native';

import styles from './AppLoading.style';

function AppLoadingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>여기 로고 들어갈 거임</Text>
    </View>
  );
}

export default AppLoadingTemplate;
