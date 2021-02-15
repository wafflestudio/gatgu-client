import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './ChattingList.style';

function ChattingListTemplate({ navigation }: any): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>this is chatting</Text>
      <Button
        onPress={() => navigation.navigate('ChatRoom')}
        title="Chat room 1"
      />
    </View>
  );
}

export default ChattingListTemplate;
