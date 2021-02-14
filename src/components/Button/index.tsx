import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  [x: string]: any;
}

function Button({ title, onPress, ...rest }: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
