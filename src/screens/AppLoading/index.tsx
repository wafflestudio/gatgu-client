import React from 'react';
import { View, Text } from 'react-native';
import styles from './AppLoading.style';

function AppLoadingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>여기 로고가 들어감</Text>
    </View>
  );
}

export default AppLoadingTemplate;
