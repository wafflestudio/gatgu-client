import React from 'react';
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { ArticleStatus } from '@/constants/Enum';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';

import styles from './Chat.style';

interface IChatProps {
  orderStatus: IArticleStatus;
  article_id: number | undefined;
}

function Chat({ article_id, orderStatus }: IChatProps): JSX.Element {
  const navigation = useNavigation();
  const navigateToChatRoom = () => {
    if (orderStatus <= ArticleStatus.BARGAINING) {
      navigation.navigate('ChattingRoom', { id: article_id });
    }
  };
  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={navigateToChatRoom}>
        <View
          style={[
            styles.chattingButton,
            orderStatus <= ArticleStatus.BARGAINING
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
