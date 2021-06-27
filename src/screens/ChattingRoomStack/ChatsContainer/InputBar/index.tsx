import React from 'react';
import { View, TextInput, Text } from 'react-native';

import { palette } from '@/styles';

import styles from './InputBar.style';

function InputBar(): JSX.Element {
  return (
    <View style={styles.bar}>
      <View style={styles.inputIcon}>
        <Text>1</Text>
      </View>
      <View style={styles.inputIcon}>
        <Text>2</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={palette.gray}
          placeholder="메시지를 입력하세요"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={styles.inputIcon}>
        <Text>3</Text>
      </View>
    </View>
  );
}

export default InputBar;
