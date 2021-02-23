import { StringInput } from '@/components';
import { View, Text } from 'react-native';
import React from 'react';

export interface IInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  warnString: string;
  checkString: string;
  available?: boolean;
  buttonString?: string;
  buttonOnPress?: () => void;
}

function Input({
  value,
  onChangeText,
  placeholder,
  warnString,
  checkString,
  available,
  buttonString,
  buttonOnPress,
}: IInputProps): JSX.Element {
  return (
    <View>
      <Text>{warnString}</Text>
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
    </View>
  );
}

export default Input;
