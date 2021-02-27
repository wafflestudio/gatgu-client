import { Button, StringInput } from '@/components';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './Input.style';
import { palette } from '@/styles';

export interface IInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  invalidString: string;
  validString: string;
  isValid: boolean;
  buttonString?: string;
  buttonOnPress?: () => void;
  marginBottom?: number;
}

function Input({
  value,
  onChangeText,
  placeholder,
  invalidString,
  isValid,
  buttonString,
  buttonOnPress,
  marginBottom,
}: IInputProps): JSX.Element {
  const [typing, setTyping] = useState(false);
  return (
    <View style={{ ...styles.container, marginBottom: marginBottom || 24 }}>
      {!isValid && typing ? (
        <Text style={styles.warnText}>{invalidString}</Text>
      ) : (
        <Text style={styles.warnText} />
      )}
      <StringInput
        value={value}
        onChangeText={(e) => {
          setTyping(true);
          onChangeText(e);
        }}
        placeholder={placeholder}
        style={styles.inputBox}
        placeholderStyle={styles.inputBox}
        placeholderTextColor={palette.gray}
      />
      {placeholder.localeCompare('이메일') ? null : (
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
}

export default Input;
