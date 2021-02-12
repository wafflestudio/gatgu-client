import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Article } from '@/components';

function ArticlePage() {
  return (
    <View style={styles.container}>
      <Article />
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

export default ArticlePage;
