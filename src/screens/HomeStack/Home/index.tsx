import React, { useEffect, useLayoutEffect } from 'react';

import { View } from 'native-base';

import { articleAPI } from '@/apis';
import NotifcationIcon from '@/assets/icons/Notification/notification.svg';
import { ArticleBox, CursorFlatList } from '@/components';
import { useCursorPagination } from '@/helpers/hooks';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { IArticleSummary } from '@/types/article';

const Home: React.FC = () => {
  const navigation = useAppNavigation();

  const {
    items,
    firstFetching,
    isFirstPage,
    fetching,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: articleAPI.getArticles,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          onTouchEnd={() => {
            navigation.navigate(AppRoutes.Notification);
          }}
        >
          <NotifcationIcon />
        </View>
      ),
    });
  }, [navigation]);

  // 초기 렌더링
  useEffect(() => {
    getItems('first');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderArticle = ({ item }: { item: IArticleSummary }) => (
    <ArticleBox {...item} />
  );

  return (
    <CursorFlatList
      items={items}
      loading={firstFetching && isFirstPage}
      isFirstPage={isFirstPage}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default Home;
