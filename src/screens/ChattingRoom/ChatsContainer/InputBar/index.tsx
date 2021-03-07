import React from 'react';
import { View, TextInput, Text } from 'react-native';

import { palette } from '@/styles';

import InputBarStyle from './InputBar.style';

function InputBar(): JSX.Element {
  return (
    <View style={InputBarStyle.bar}>
      <View style={InputBarStyle.inputIcon}>
        <Text>1</Text>
      </View>
      <View style={InputBarStyle.inputIcon}>
        <Text>2</Text>
      </View>
      <View style={InputBarStyle.inputWrapper}>
        <TextInput
          placeholderTextColor={palette.gray}
          placeholder="메시지를 입력하세요"
          style={InputBarStyle.input}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={InputBarStyle.inputIcon}>
        <Text>3</Text>
      </View>
    </View>
  );
}

export default InputBar;
