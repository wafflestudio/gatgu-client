import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { Container, Header, ScrollableTab, Tab, Tabs } from 'native-base';

import UserGatguGathering from './UserGatguGathering';
import UserGatguParticipating from './UserGatguParticipating';

const UserGatgu: React.FC = () => {
  //   const a = useInfiniteQuery();

  return (
    <Container>
      <Header hasTabs />
      <Tabs renderTabBar={() => <ScrollableTab />} />
      <Tab heading="내가 참여한 같구">
        <UserGatguParticipating />
      </Tab>
      <Tab heading="내가 모집한 같구">
        <UserGatguGathering />
      </Tab>
    </Container>
  );
};

export default UserGatgu;
