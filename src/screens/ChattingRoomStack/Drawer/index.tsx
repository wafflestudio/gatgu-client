import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { Profile } from '@/components';
import { GSpace, GText } from '@/components/Gatgu';
import { ParticipantStatus, WSMessage } from '@/enums';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { TWsMessage } from '@/helpers/GatguWebsocket/_internal/types';
import { removeRecentlyReadMessageId } from '@/helpers/functions/chat';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { RootState } from '@/store';
import { fetchingParticipants, updateRoomImages } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IChatUserProps, IUserSimple } from '@/types/user';

import styles from './Drawer.style';
import StatusModal from './Modal';

function Drawer({
  roomID,
  authorId,
}: {
  roomID: number;
  authorId: number;
}): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toaster = useToaster();

  const currentUser = useUserDetail().data;

  const userID = currentUser?.id;

  const isAuthor = authorId === userID;

  // -1: undefined (modal closed)
  // 0+: id of clicked user (modal open)
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IChatUserProps>();

  const [author, setAuthor] = useState<IUserSimple | null>(null);

  const participants = useSelector(
    (state: RootState) => state.chat.participantsList
  );
  const images = useSelector((state: RootState) => state.chat.images);

  // fetch all images
  const updateImages = React.useCallback(() => {
    dispatch(updateRoomImages(roomID));
  }, [roomID, dispatch]);

  const { sendWsMessage } = GatguWebsocket.useMessage<TWsMessage>({
    onmessage: (socket) => {
      // refetch participant list when a status has been updated
      if (socket.type === WSMessage.RECEIVE_UPDATED_STATUS) {
        dispatch(fetchingParticipants(roomID));
      }

      if (socket.type === WSMessage.RECEIVE_MESSAGE_SUCCESS) {
        if (socket.data.image?.length > 0) {
          updateImages();
        }
      }
    },
  });

  useEffect(() => {
    // fetch participants' info
    dispatch(fetchingParticipants(roomID));

    // fetch author
    userAPI.getOtherUserData(authorId).then((res) => {
      setAuthor(res.data);
    });

    // get room images
    updateImages();
  }, [roomID, authorId, dispatch, updateImages]);

  const handlePressExit = () => {
    const wsMessage = {
      type: WSMessage.EXIT_ROOM,
      data: {
        user_id: userID,
        room_id: roomID,
      },
      websocket_id: `${DateTime.now()}`,
    };
    sendWsMessage(wsMessage, {
      resolveCondition: (data) => data.type === WSMessage.EXIT_ROOM_SUCCESS,
      rejectCondition: (data) => data.type === WSMessage.EXIT_ROOM_FAILURE,
    })
      .then(() => {
        if (roomID) {
          dispatch(fetchingParticipants(roomID));
        }
        removeRecentlyReadMessageId(roomID);
        navigation.goBack();
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
        id={user.participant.user_id}
        picture={user.participant.picture}
        nickname={user.participant.nickname}
      />
      <View style={styles.infoWrapper}>
        <TouchableOpacity
          disabled={
            user.pay_status === ParticipantStatus.pay_checked ||
            (!isAuthor &&
              (user.participant.user_id !== userID ||
                user.pay_status === ParticipantStatus.request_check_pay))
          }
          onPress={() => handleCheck(user)}
        >
          {user.pay_status === ParticipantStatus.pay_checked ? (
            <Icon name="checkbox-marked" size={25} />
          ) : user.pay_status === ParticipantStatus.before_pay ? (
            <Icon name="checkbox-blank-outline" size={25} />
          ) : (
            <Icon
              name="checkbox-blank-outline"
              size={25}
              color={palette.yellow}
            />
          )}
        </TouchableOpacity>
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
        <Flex
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          mr="12px"
        >
          <Text style={styles.bigLabelText}>사진</Text>
          <GText
            touchable
            textDecorationLine="underline"
            size={15}
            onPress={() => {
              navigation.navigate('ChattingRoomImages');
            }}
          >
            사진첩
          </GText>
        </Flex>

        <Flex direction="row" justifyContent="space-between" mr="10px">
          {images.slice(images.length - 2).map((uri) => (
            <Image
              key={uri}
              source={{ uri }}
              style={{
                width: '47%',
                aspectRatio: 1,
              }}
              resizeMethod="resize"
            />
          ))}
        </Flex>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.bigLabelText}>참여 인원 목록</Text>
        <ScrollView style={{ width: '100%' }}>
          {author ? (
            <>
              <Profile
                id={author.id}
                picture={author.picture}
                nickname={author.nickname}
              />
              <GSpace h={20} />
            </>
          ) : null}
          {renderedParticipants}
        </ScrollView>
      </View>
      {!isAuthor && (
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={handlePressExit}>
            <Text style={styles.smallLabelText}>나가기</Text>
          </TouchableOpacity>
        </View>
      )}
      {modalOpen ? (
        <StatusModal
          onModalOpen={setModalOpen}
          isAuthor={isAuthor}
          roomID={roomID}
          user={user}
        />
      ) : null}
    </View>
  );
}

export default Drawer;
