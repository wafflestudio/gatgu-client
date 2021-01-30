import React from 'react';
import { Button as DefualtButton } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  [x: string]: any;
}

export default function Button({ title, onPress, ...rest }: ButtonProps) {
  return <DefualtButton title={title} onPress={onPress} {...rest} />;
}
