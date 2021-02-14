import React from 'react';
import { View, Text } from 'react-native';

import styles from './ChattingList.style';

function ChattingListTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>this is chatting</Text>
    </View>
  );
}

export default ChattingListTemplate;
