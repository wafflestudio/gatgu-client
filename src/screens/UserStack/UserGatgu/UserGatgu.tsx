import React from 'react';

import { Container, ScrollableTab, Tab, Tabs } from 'native-base';

import { UserArticleActivity } from '@/enums';

import UserGatguList from './UserGatguList';

const UserGatgu: React.FC = () => {
  return (
    <Container>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="내가 참여한 같구">
          <UserGatguList type={UserArticleActivity.Participated} />
        </Tab>
        <Tab heading="내가 모집한 같구">
          <UserGatguList type={UserArticleActivity.Hosted} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserGatgu;
