import React from 'react';
import { View, Text } from 'react-native';

import { Button, StringInput } from '@/components';
import { palette } from '@/styles';

import styles from './Input.style';

export interface IInputProps {
  value: string;
  onChangeText: (e: string) => void;
  title: string;

  errorStr?: string;
  buttonString?: string;
  buttonOnPress?: () => void;
  marginBottom?: number;
}

const Input: React.FC<IInputProps> = ({
  value,
  onChangeText,
  title,
  buttonString,
  buttonOnPress,
  marginBottom = 24,
  errorStr,
}: IInputProps) => {
  return (
    <View style={{ ...styles.container, marginBottom }}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        {errorStr && <Text style={styles.warnText}>{errorStr}</Text>}
      </View>
      <StringInput
        value={value}
        onChangeText={onChangeText}
        placeholder={title}
        style={styles.inputBox}
        placeholderStyle={styles.inputBox}
        placeholderTextColor={palette.gray}
      />
      {title.localeCompare('이메일') ? null : (
        <Text style={styles.emailPostfix}>@snu.ac.kr</Text>
      )}
      {buttonString && buttonOnPress && (
        <Button
          title={buttonString}
          onPress={buttonOnPress}
          style={styles.inputButton}
          textStyle={styles.inputButtonText}
        />
      )}
    </View>
  );
};

export default Input;
