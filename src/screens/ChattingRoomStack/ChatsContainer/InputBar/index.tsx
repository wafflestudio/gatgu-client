import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { palette } from '@/styles';

import styles from './InputBar.style';

interface IInputBarInterface {
  userID?: number;
  roomID: number;
}

function InputBar({ userID, roomID }: IInputBarInterface): JSX.Element {
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
      <TouchableOpacity
        onPress={() => {
          sendWsMessage({
            type: WSMessage.SEND_MESSAGE,
            data: {
              room_id: roomID,
              user_id: userID,
              message: {
                text: input,
                img: 'www.google.com',
              },
            },
          });
        }}
      >
        <View style={styles.inputIcon}>
          <Text>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default InputBar;
