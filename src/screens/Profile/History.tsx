import { View } from 'react-native';
import styles from './Profile.Style';
import React from 'react';
import { Button } from '@/components';

// History JSX: 거래내역 목록 버튼
function HistoryList(): JSX.Element {
  const goToHistory = () => {
    alert('not implemented');
  };

  return (
    <View style={styles.history.container}>
      <Button color="black" title="거래내역 목록" onPress={goToHistory} />
    </View>
  );
}

export default HistoryList;
