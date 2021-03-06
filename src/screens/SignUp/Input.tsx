import { Button, StringInput } from '@/components';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './Input.style';
import { palette } from '@/styles';
import { flexRow } from '@/styles/wrapper';

export interface IInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  invalidString: string;
  isValid: boolean;
  buttonString?: string;
  buttonOnPress?: () => void;
  marginBottom?: number;
}

function Input({
  value,
  onChangeText,
  title,
  invalidString,
  isValid,
  buttonString,
  buttonOnPress,
  marginBottom,
}: IInputProps): JSX.Element {
  const [typing, setTyping] = useState(false);
  return (
    <View style={{ ...styles.container, marginBottom: marginBottom || 24 }}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        {!isValid && typing ? (
          <Text style={styles.warnText}>{invalidString}</Text>
        ) : (
          <Text style={styles.warnText} />
        )}
      </View>
      <StringInput
        value={value}
        onChangeText={(e) => {
          setTyping(true);
          onChangeText(e);
        }}
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
}

export default Input;
