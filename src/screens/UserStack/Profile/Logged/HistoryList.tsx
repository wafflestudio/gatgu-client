import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import styles from './HistoryList.style';

// History JSX: 거래내역 목록 버튼
function HistoryList(): JSX.Element {
  const navigation = useAppNavigation();

  const goToHistory = () => {
    navigation.navigate('UserGatgu');
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
