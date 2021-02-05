import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WriteArticle } from '@/components';

function WriteArticlePage() {
  return (
    <View style={styles.container}>
      <WriteArticle />
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

export default WriteArticlePage;
