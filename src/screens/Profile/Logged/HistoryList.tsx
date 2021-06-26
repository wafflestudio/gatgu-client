import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Button } from '@/components';
import routes from '@/helpers/routes';

import styles from './HistoryList.style';

// History JSX: 거래내역 목록 버튼
function HistoryList(): JSX.Element {
  const navigation = useNavigation();

  const goToHistory = () => {
    navigation.navigate(routes.UserGatgu.name);
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
