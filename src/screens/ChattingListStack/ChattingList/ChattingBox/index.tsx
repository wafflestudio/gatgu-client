import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components/native';

import { InfoContainer } from '@/components';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { getRecentlyReadMessageId } from '@/helpers/functions/chat';
import { getPassedTime } from '@/helpers/functions/time';
import { useUserDetail } from '@/helpers/hooks/api';
import { palette } from '@/styles';
import { IChatListSinglePreview } from '@/types/chat';

import styles from './ChattingBox.style';

const StyledNewMessageFlag = styled.View`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  top: 15px;
  left: 10px;
  background-color: ${palette.yellow};
`;

function ChattingBox({ item }: { item: IChatListSinglePreview }): JSX.Element {
  const { data: currentUser } = useUserDetail();

  const myNickname = currentUser?.userprofile.nickname;

  const [isRecentMessageUnread, setRecentMessageUnread] = React.useState(false);

  const { recent_message, id: roomId } = item;

  const { sent_by } = recent_message;

  const sent_at = useMemo(() => {
    return recent_message?.sent_at
      ? getPassedTime(recent_message?.sent_at)
      : '';
  }, [recent_message]);

  React.useEffect(() => {
    getRecentlyReadMessageId(roomId).then((res) => {
      setRecentMessageUnread(
        Boolean(recent_message?.id) &&
          res !== recent_message.id &&
          sent_by.id !== currentUser?.userprofile.user_id
      );
    });
  }, [roomId, recent_message, currentUser, sent_by]);

  const renderNewMessageFlag = () => {
    if (!isRecentMessageUnread) return null;

    return <StyledNewMessageFlag />;
  };

  return (
    <InfoContainer>
      {renderNewMessageFlag()}
      <Thumbnail uri={item.article.image} />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.Head}>{sent_by?.nickname || myNickname}</Text>
          <Text style={styles.timeWrapper}>{sent_at}</Text>
        </View>
        <View style={styles.Box}>
          <Text style={styles.Head} ellipsizeMode={'tail'} numberOfLines={1}>
            {recent_message.image?.length > 0
              ? '사진을 전송하였습니다'
              : recent_message.text}
          </Text>
          <Text
            style={styles.description}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {item.article.title}
          </Text>
        </View>
      </View>
    </InfoContainer>
  );
}

export default ChattingBox;
