import React, { useContext } from 'react';
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';

import { View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { getMyData } from '@/apis/UserApi';
import { ArticleStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';
import { IUserDetail } from '@/types/user';

import styles from './Chat.style';

interface IChatProps {
  orderStatus: IArticleStatus;
  article_id: number | undefined;
}

function Chat({ article_id, orderStatus }: IChatProps): JSX.Element {
  const navigation = useNavigation();
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;

  const navigateToChatRoom = () => {
    if (orderStatus.progress_status <= ArticleStatus.Dealing) {
      sendWsMessage({
        type: WSMessage.ENTER_ROOM,
        data: {
          room_id: 5,
          user_id: currentUser?.id,
        },
      });
      navigation.navigate('ChattingRoom', { id: article_id });
    }
  };
  return (
    <View style={styles.userContainer}>
      <TouchableHighlight onPress={navigateToChatRoom}>
        <View
          style={[
            styles.chattingButton,
            orderStatus.progress_status <= ArticleStatus.Dealing
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
