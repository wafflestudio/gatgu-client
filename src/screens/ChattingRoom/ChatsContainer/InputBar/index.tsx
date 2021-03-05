import React from 'react';
import { View, TextInput } from 'react-native';

function InputBar(): JSX.Element {
  return (
    <View>
      <View>camera</View>
      <TextInput defaultValue="메시지를 입력하세요" />
      <View>send</View>
    </View>
  );
}

export default InputBar;
