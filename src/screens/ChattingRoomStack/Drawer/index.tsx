import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { Checkbox } from 'native-base';
import { stringify } from 'querystring';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { getMyData } from '@/apis/UserApi';
import { Button, Profile } from '@/components';
import CheckBox from '@/components/CheckBox';
import { WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { USER_DETAIL } from '@/queryKeys';
import { RootState } from '@/store';
import { fetchingParticipants } from '@/store/chatSlice';
import { IChatMessage } from '@/types/chat';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IChatUserProps, IUserDetail } from '@/types/user';

import styles from './Drawer.style';

interface IDrawerTemplateProps {
  pictureUrls: string[];
  users: IChatUserProps[];
  // [x: string]: any;
}

function Drawer({ pictureUrls }: IDrawerTemplateProps): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const dispatch = useDispatch();
  const currentUser = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  ).data;
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const userID = currentUser?.id;
  const roomID = route.params.params.id; // TODO @juimdpp to debug
  // const [participants, setParticipants] = useState<IChatUserProps[]>([]);

  const participants = useSelector(
    (state: RootState) => state.chat.participantsList
  );

  useEffect(() => {
    dispatch(fetchingParticipants(roomID));
  }, [roomID]);

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image source={{ uri }} style={styles.image} />
  );

  const handleCheck = () => {
    console.log("handle check not yet (api doesn't work for pay_status)");
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

  const renderedParticipants = participants.map((user, ind) => (
    <View key={ind} style={styles.profileBox}>
      <Profile
        profile_id={user.participant.profile_id}
        picture={user.participant.picture}
        nickname={user.participant.nickname}
      />
      <View style={styles.infoWrapper}>
        <Checkbox
          aria-label={`${ind}`}
          value={`${ind}_${user.pay_status}`}
          onChange={handleCheck}
          defaultIsChecked={false}
        />
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
