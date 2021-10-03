import React from 'react';
import { View, Text } from 'react-native';

import styles from './Bubble.style';

interface IBubbleProps {
  message: string;
  isSelf: boolean;
}

//messageBox
function Bubble({ message, isSelf }: IBubbleProps): JSX.Element {
  return (
    <View style={isSelf ? styles.rightBubble : styles.leftBubble}>
      <Text style={styles.chatText}>{message}</Text>
    </View>
  );
}

export default Bubble;
