import React from 'react';
import { View, StyleSheet } from 'react-native';

import HomeTemplate from './template';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeTemplate />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
