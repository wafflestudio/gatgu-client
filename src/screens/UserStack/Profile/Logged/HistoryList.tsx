import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { GText } from '@/components/Gatgu/GText';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import styles from './HistoryList.style';

// History JSX: 거래내역 목록 버튼
function HistoryList(): JSX.Element {
  const navigation = useAppNavigation();

  const goToHistory = () => {
    navigation.navigate('UserGatgu');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={goToHistory}
    >
      <GText size="huge" bold>
        거래내역 목록
      </GText>
    </TouchableOpacity>
  );
}

export default HistoryList;
