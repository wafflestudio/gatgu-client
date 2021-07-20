import React from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { useQuery } from 'react-query';

import { DateTime } from 'luxon';

import { RouteProp, useRoute } from '@react-navigation/native';

import { getMyData } from '@/apis/UserApi';
import { Button, Profile } from '@/components';
import CheckBox from '@/components/CheckBox';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IChatUserProps, IUserDetail } from '@/types/user';

import styles from './Drawer.style';

interface IDrawerTemplateProps {
  pictureUrls: string[];
  users: IChatUserProps[];
  // [x: string]: any;
}

function Drawer({ pictureUrls, users }: IDrawerTemplateProps): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const userID = currentUser?.id;
  const roomID = route.params.id;

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image source={{ uri }} style={styles.image} />
  );

  const handleCheck = () => {
    console.log('handle check not yet');
  };

  const handlePressExit = () => {
    sendWsMessage({
      type: WSMessage.EXIT_ROOM,
      data: {
        user_id: userID,
        room_id: roomID,
      },
      websocket_id: `${DateTime.now()}`,
    });
  };

  const renderedParticipants = users.map((user, ind) => (
    <View key={ind} style={styles.profileBox}>
      <Profile
        profile_id={user.participant.profile_id}
        picture={user.participant.picture}
        nickname={user.participant.nickname}
      />
      <View style={styles.infoWrapper}>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            selected={user.pay_status}
            onPress={() => handleCheck()}
            size={20}
            iconSize={16}
          />
        </View>
        <View>
          <Text style={styles.priceText}>
            {user.wish_price.toLocaleString()}원
          </Text>
        </View>
      </View>
    </View>
  ));

  return (
    <View style={styles.drawerInnerWrapper}>
      <View style={styles.pictureContainer}>
        <Text style={styles.bigLabelText}>사진</Text>
        <FlatList
          data={pictureUrls}
          renderItem={renderPicure}
          keyExtractor={(_, ind) => `${ind}`}
          horizontal={true}
        />
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.bigLabelText}>참여 인원 목록</Text>
        {renderedParticipants}
      </View>
      <View style={styles.optionContainer}>
        <Button
          title="나가기"
          onPress={handlePressExit}
          textStyle={styles.smallLabelText}
        />
      </View>
    </View>
  );
}

export default Drawer;
