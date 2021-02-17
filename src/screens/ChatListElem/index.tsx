import React from 'react';
import { View, Text } from 'react-native';

import styles from './ChatListElem.style';

function ChatListElemTemplate(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Chatting Room</Text>
    </View>
  );
}

export default ChatListElemTemplate;
