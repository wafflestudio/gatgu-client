import React, { useEffect } from 'react';

import { Container, ScrollableTab, Tab, Tabs } from 'native-base';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { useCursorPagination } from '@/helpers/hooks';
import { IArticleSummary } from '@/types/article';

const UserGatgu: React.FC = () => {
  const {
    isFirstPage: isParticipatedFirstPage,
    items: participatedItems,
    refreshing: refreshingParticipatedItems,
    fetching: fetchingParticipatedItems,
    getItems: getParticipatedItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: articleAPI.getArticles,
  });

  const {
    isFirstPage: isHostedFirstPage,
    items: hostedItems,
    refreshing: refreshingHostedItems,
    fetching: fetchingHostedItems,
    getItems: getHostedItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: articleAPI.getArticles,
  });

  // 초기 렌더링
  useEffect(() => {
    getHostedItems('first');
    getParticipatedItems('first');
  }, []);

  const renderArticle = ({ item }: { item: IArticleSummary }) => (
    <ArticleBox {...item} />
  );

  const renderUserGatguList = (type: 'hosted' | 'participated') => {
    const isHostedItemsTab = type === 'hosted';

    const items = isHostedItemsTab ? hostedItems : participatedItems;
    const refreshing = isHostedItemsTab
      ? refreshingHostedItems
      : refreshingParticipatedItems;
    const fetching = isHostedItemsTab
      ? fetchingHostedItems
      : fetchingParticipatedItems;

    const isFirstPage = isHostedItemsTab
      ? isHostedFirstPage
      : isParticipatedFirstPage;
    const getItems = isHostedItemsTab ? getHostedItems : getParticipatedItems;

    return (
      <CursorFlatList
        items={items}
        refreshing={refreshing}
        isFirstPage={isFirstPage}
        fetching={fetching}
        getItems={getItems}
        renderItem={renderArticle}
      />
    );
  };

  return (
    <Container>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="내가 참여한 같구">
          {renderUserGatguList('participated')}
        </Tab>
        <Tab heading="내가 모집한 같구">{renderUserGatguList('hosted')}</Tab>
      </Tabs>
    </Container>
  );
};

export default UserGatgu;
