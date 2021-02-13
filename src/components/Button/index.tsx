import React from 'react';
import { Button as DefualtButton } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  [x: string]: any;
}

function Button({ title, onPress, ...rest }: ButtonProps): JSX.Element {
  return <DefualtButton title={title} onPress={onPress} {...rest} />;
}

export default Button;
