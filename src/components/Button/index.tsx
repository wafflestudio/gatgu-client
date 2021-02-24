import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  textStyle?: StyleProp<TextStyle>;
  [x: string]: any;
}

function Button({
  title,
  onPress,
  textStyle,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
