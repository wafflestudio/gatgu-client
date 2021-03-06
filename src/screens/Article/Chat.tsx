import { View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Chat.style';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { palette } from '@/styles';
import { ON_GOING } from '@/constants/Enum';

interface IChatProps {
  orderStatus: string;
}

function Chat({ orderStatus }: IChatProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={() => navigation.navigate('ChatListElem')}>
        <View
          style={[
            styles.chattingButton,
            orderStatus === ON_GOING
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
