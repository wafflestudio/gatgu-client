import { View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Chat.style';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function Chat(): JSX.Element {
  const navigation = useNavigation();

  const chattingRedirect = () => {
    navigation.navigate('ChatListElem');
  };

  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={chattingRedirect}>
        <View style={styles.chattingButton}>
          <Text style={styles.chattingText}>구매 채팅으로 가기</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
export default Chat;
