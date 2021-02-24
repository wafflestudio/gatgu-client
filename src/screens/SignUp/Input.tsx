import { Button, StringInput } from '@/components';
import { View, Text } from 'react-native';
import React from 'react';

export interface IInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  invalidString: string;
  validString: string;
  isValid?: boolean;
  buttonString?: string;
  buttonOnPress?: () => void;
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
}: IInputProps): JSX.Element {
  return (
    <View>
      <Text>{isValid ? validString : invalidString}</Text>
      <StringInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={
          {
            // TODO: design 단계에서 하겠습니다
          }
        }
        placeholderStyle={
          {
            // TODO: design 단계에서 하겠습니다
          }
        }
      />
      {buttonString && buttonOnPress && (
        <Button title={buttonString} onPress={buttonOnPress} style={{}} />
      )}
    </View>
  );
}

export default Input;
