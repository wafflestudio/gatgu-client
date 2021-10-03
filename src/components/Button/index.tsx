import React from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  [x: string]: any;
}
/**
 * 💀 DO NOT USE THIS COMPONENT!!
 *
 * please use "Button" from **native-base**
 */
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
