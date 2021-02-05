import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import HomeTemplate from './template';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeTemplate />
    </SafeAreaView>
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
