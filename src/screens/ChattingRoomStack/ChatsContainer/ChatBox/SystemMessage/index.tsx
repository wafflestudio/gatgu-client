import React from 'react';
import { View, Text } from 'react-native';

import styles from './SystemMessage.style';

interface ISystemMessageProps {
  message: string;
}

function SystemMessage({ message }: ISystemMessageProps): JSX.Element {
  return (
    <View style={styles.systemWrapper}>
      <View style={styles.box}>
        <Text style={styles.systemText}>{message}</Text>
      </View>
    </View>
  );
}

export default SystemMessage;
