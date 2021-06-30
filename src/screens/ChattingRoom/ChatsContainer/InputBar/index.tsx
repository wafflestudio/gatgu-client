import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { palette } from '@/styles';

import styles from './InputBar.style';

interface IInputBarInterface {
  handleSend: (newMessage: string) => Promise<void>;
}

function InputBar({ handleSend }: IInputBarInterface): JSX.Element {
  const [text, setText] = useState('');

  const handlePress = () => {
    if (text.length != 0) {
      handleSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.bar}>
      <View style={styles.inputIcon}>
        <Text>Cam</Text>
      </View>
      <View style={styles.inputIcon}>
        <Text>Plus</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholderTextColor={palette.gray}
          placeholder="메시지를 입력하세요"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={styles.inputIcon}>
        <TouchableOpacity onPress={handlePress}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InputBar;
