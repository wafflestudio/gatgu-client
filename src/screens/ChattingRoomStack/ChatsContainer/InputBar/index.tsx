import React, { SetStateAction } from 'react';
import { View, TextInput, Text, GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Dispatch } from 'redux';

import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { palette } from '@/styles';

import styles from './InputBar.style';

interface IInputBarInterface {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (event: GestureResponderEvent) => void;
}

function InputBar({
  input,
  setInput,
  handleSendMessage,
}: IInputBarInterface): JSX.Element {
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
          value={input}
          onChangeText={setInput}
        />
      </View>
      <TouchableOpacity onPress={handleSendMessage}>
        <View style={styles.inputIcon}>
          <Text>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default InputBar;
