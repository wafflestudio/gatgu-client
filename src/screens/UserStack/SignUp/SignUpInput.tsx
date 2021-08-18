import React from 'react';
import { View, Text } from 'react-native';

import { Button, StringInput } from '@/components';
import { GInput, GInputProps, GSpace } from '@/components/Gatgu';
import { palette } from '@/styles';

import styles from './Input.style';

export interface IInputProps extends GInputProps {
  value: string;
  onChangeText: (e: string) => void;
  title: string;

  errorStr?: string;
  buttonString?: string;
  buttonOnPress?: () => void;
  marginBottom?: number;
}

const SignUpInput: React.FC<IInputProps> = ({
  value,
  title,
  marginBottom = 24,
  errorStr,
  onChangeText,
  ...inputProps
}: IInputProps) => {
  return (
    <View style={{ ...styles.container, marginBottom }}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        {errorStr && <Text style={styles.warnText}>{errorStr}</Text>}
      </View>
      <GSpace h={4} />
      <GInput
        noBorder
        value={value}
        onChangeText={onChangeText}
        placeholder={title}
        {...inputProps}
      />
    </View>
  );
};

export default SignUpInput;
