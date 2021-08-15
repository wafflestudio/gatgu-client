import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { Checkbox } from 'native-base';

import { RouteProp, useRoute } from '@react-navigation/native';

import { chatAPI } from '@/apis';
import { Profile } from '@/components';
import { ParticipantStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { RootState } from '@/store';
import { fetchingParticipants } from '@/store/chatSlice';
import { ChattingDrawerParamList } from '@/types/navigation';
import { IChatUserProps } from '@/types/user';

import styles from './Drawer.style';
import StatusModal from './Modal';

function Drawer(): JSX.Element {
  const route = useRoute<RouteProp<ChattingDrawerParamList, 'ChattingRoom'>>();
  const dispatch = useDispatch();
  const toaster = useToaster();
  const currentUser = useUserDetail().data;
  const userID = currentUser?.id;
  const roomID = route.params.params.id; // TODO @juimdpp to debug
  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (socket) => {
      // refetch participant list when a status has been updated
      if (socket.type === WSMessage.RECEIVE_UPDATED_STATUS) {
        dispatch(fetchingParticipants(roomID));
      }
    },
  });
  // -1: undefined (modal closed)
  // 0+: id of clicked user (modal open)
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IChatUserProps>();
  const [pictureUrls, setPictureUrls] = useState<string[]>([]);

  const participants = useSelector(
    (state: RootState) => state.chat.participantsList
  );
  const isAuthor = useMemo(() => {
    return (
      participants.filter((person) => {
        return person.participant.user_id === userID;
      }).length === 0
    );
  }, [participants, userID]);

  useEffect(() => {
    // fetch participants' info
    dispatch(fetchingParticipants(roomID));
  }, [roomID, dispatch]);
  useEffect(() => {
    // fetch all images
    chatAPI.getChatPictures(roomID).then((res) => {
      setPictureUrls(res.data.map((img) => img.img_url));
    });
  }, [roomID]);

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image source={{ uri }} style={styles.image} />
  );

  const handlePressExit = () => {
    const wsMessage = {
      type: WSMessage.EXIT_ROOM,
      data: {
        user_id: userID,
        room_id: roomID,
      },
      websocket_id: `${DateTime.now()}`,
    };
    sendWsMessage(wsMessage)
      .then(() => {
        if (roomID) {
          dispatch(fetchingParticipants(roomID));
        }
      })
      .catch(() => {
        toaster.error(
          '채팅방에서 나가지 못 했습니다. 네트워크 연결을 확인해주세요.'
        );
      });
  };

  const handleCheck = (user: IChatUserProps) => {
    setModalOpen(true);
    setUser(user);
  };

  const renderedParticipants = participants.map((user, ind) => (
    <View key={ind} style={styles.profileBox}>
      <Profile
        profile_id={user.participant.user_id}
        picture={user.participant.picture}
        nickname={user.participant.nickname}
      />
      <View style={styles.infoWrapper}>
        <Checkbox
          aria-label={`${ind}`}
          value={`${ind}_${user.pay_status}`}
          onChange={() => handleCheck(user)}
          defaultIsChecked={false}
          isDisabled={user.pay_status === ParticipantStatus.pay_checked}
          // isDisabled={true}
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
        <TouchableOpacity onPress={handlePressExit}>
          <Text style={styles.smallLabelText}>나가기</Text>
        </TouchableOpacity>
      </View>
      {modalOpen ? (
        <StatusModal
          onClose={() => setModalOpen(false)}
          isAuthor={isAuthor}
          roomID={roomID}
          user={user}
        />
      ) : null}
    </View>
  );
}

export default Drawer;
