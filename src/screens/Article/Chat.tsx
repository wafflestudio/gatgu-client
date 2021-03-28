import React from 'react';
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { Status } from '@/constants/Enum';
import { palette } from '@/styles';

import styles from './Chat.style';

interface IChatProps {
  orderStatus: number;
}

function Chat({ orderStatus }: IChatProps): JSX.Element {
  const navigation = useNavigation();
  const navigateToChatRoom = () => {
    if (orderStatus < Status.ORDER_COMPLETE) {
      navigation.navigate('ChatListElem');
    }
  };
  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={navigateToChatRoom}>
        <View
          style={[
            styles.chattingButton,
            orderStatus < Status.ORDER_COMPLETE
              ? { backgroundColor: palette.blue, borderColor: palette.blue }
              : {
                  backgroundColor: palette.borderGray,
                  borderColor: palette.borderGray,
                },
          ]}
        >
          <Text style={styles.chattingText}>구매 채팅으로 가기</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
export default Chat;
