import React from 'react';
import { View, Text } from 'react-native';
import BubbleStyle from './Bubble.style';

interface IBubbleProps {
  message: string;
  isSelf: boolean;
}

//messageBox
function Bubble({ message, isSelf }: IBubbleProps): JSX.Element {
  return (
    <View style={isSelf ? BubbleStyle.rightBubble : BubbleStyle.leftBubble}>
      <Text style={BubbleStyle.chatText}>{message}</Text>
    </View>
  );
}

export default Bubble;
