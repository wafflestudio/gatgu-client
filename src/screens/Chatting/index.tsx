import React from 'react';
import { View, Text } from 'react-native';

import styles from './Chatting.style';

function ChattingTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>this is chatting</Text>
    </View>
  );
}

export default ChattingTemplate;
