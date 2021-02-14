import { View } from 'native-base';
import React from 'react';
import { Text, Image } from 'react-native';
import styles from './ProfileChat.style';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { typo } from '@/styles';

// TODO: change input type
function Profile_Chat({ dummyArticle }: any): JSX.Element {
  const chattingRedirect = () => {
    alert('Redirect to chatting room');
  };

  const Profile = (
    <View style={styles.profile}>
      <Image
        style={styles.profileImg}
        source={{ uri: dummyArticle.writer.picture }}
      />
      <Text style={{ ...typo.semiTitle }}>{dummyArticle.writer.nickname}</Text>
    </View>
  );
  const Chat = (
    <TouchableHighlight onPress={chattingRedirect}>
      <View style={styles.chattingButton}>
        <Text style={styles.chattingText}>구매 채팅으로 가기</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.userContainer}>
      {Profile}
      {Chat}
    </View>
  );
}
export default Profile_Chat;
