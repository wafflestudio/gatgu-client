import React from 'react';
import { View, TextInput, Text } from 'react-native';

import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { palette } from '@/styles';

import styles from './InputBar.style';

const user = Math.floor(Math.random() * 1000);

function InputBar(): JSX.Element {
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const [input, setInput] = React.useState('');

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
      <View
        style={styles.inputIcon}
        onTouchEnd={() => {
          sendWsMessage({
            type: 'CHAT',
            data: {
              input,
              user,
            },
          });
        }}
      >
        <Text>3</Text>
      </View>
    </View>
  );
}

export default InputBar;
