import React from 'react';
import { View, Alert } from 'react-native';

import { Button } from '@/components';

import styles from './HistoryList.style';

// History JSX: 거래내역 목록 버튼
function HistoryList(): JSX.Element {
  const goToHistory = () => {
    Alert.alert('not implemented');
  };

  return (
    <View style={styles.container}>
      <Button
        color="black"
        title="거래내역 목록"
        onPress={goToHistory}
        style={styles.historyBtn}
        textStyle={styles.historyBtnText}
      />
    </View>
  );
}

export default HistoryList;
