import { Button, StringInput } from '@/components';
import { View, Text } from 'react-native';
import React from 'react';
import styles from './Input.style';

export interface IInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  invalidString: string;
  validString: string;
  isValid?: boolean;
  buttonString?: string;
  buttonOnPress?: () => void;
  marginBottom?: number;
}

function Input({
  value,
  onChangeText,
  placeholder,
  invalidString,
  validString,
  isValid,
  buttonString,
  buttonOnPress,
  marginBottom,
}: IInputProps): JSX.Element {
  return (
    <View style={{ ...styles.container, marginBottom: marginBottom || 24 }}>
      {isValid ? (
        <Text style={styles.validText}>{validString}</Text>
      ) : (
        <Text style={styles.warnText}>{invalidString}</Text>
      )}
      <StringInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.InputBox}
        placeholderStyle={styles.InputBox}
      />
      {buttonString && buttonOnPress && (
        <Button title={buttonString} onPress={buttonOnPress} style={{}} />
      )}
    </View>
  );
}

export default Input;
