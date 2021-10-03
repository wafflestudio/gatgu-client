import React from 'react';

import styled from 'styled-components/native';

import { useRoute } from '@react-navigation/native';

import { getOtherUserData } from '@/apis/UserApi';
import Force from '@/screens/UserStack/Profile/Logged/Force';
import Info from '@/screens/UserStack/Profile/Logged/Information';
import { IUserSimple } from '@/types/user';

const StyledView = styled.View``;

const UserProfile: React.FC = () => {
  const route = useRoute<any>();
  const userId = route.params?.id;

  const [user, setUser] = React.useState<IUserSimple>();

  React.useEffect(() => {
    getOtherUserData(userId ?? 4).then((res) => {
      setUser(res.data);
    });
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <StyledView>
      <Info
        isMine={false}
        nickname={user.nickname}
        picture={user.picture}
        trading_address={user.trading_address}
      />
      <Force
        hosted_count={user.hosted_count}
        participated_count={user.participated_count}
      />
    </StyledView>
  );
};

export default UserProfile;
