import React from 'react';
import { View, Text } from 'react-native';
import styles from './AppLoading.style';

function AppLoadingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.mainLogo}>여기 로고 1이 들어감</Text>
      <Text style={styles.subLogo}>여기 로고 2가 들어감</Text>
    </View>
  );
}

export default AppLoadingTemplate;
