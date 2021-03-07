import React from 'react';
import { View, Text } from 'react-native';

import styles from './SystemMessage.style';

interface ISystemMessageProps {
  message: string;
  previousSystem?: boolean;
}

function SystemMessage({
  message,
  previousSystem,
}: ISystemMessageProps): JSX.Element {
  return (
    <View style={styles.systemWrapper}>
      <View style={[styles.box, !previousSystem && styles.marginBottom24]}>
        <Text style={styles.systemText}>{message}</Text>
      </View>
    </View>
  );
}

export default SystemMessage;
