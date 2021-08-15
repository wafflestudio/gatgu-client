import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, Text } from 'react-native';

import { View } from 'native-base';

import { articleAPI } from '@/apis';
import NotifcationIcon from '@/assets/icons/Notification/notification.svg';
import { ArticleBox, CursorFlatList } from '@/components';
import Error from '@/components/Error';
import { useCursorPagination } from '@/helpers/hooks';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { IArticleSummary } from '@/types/article';

import HomeShimmer from '../../../components/Shimmer/HomeShimmer';

const Home: React.FC = () => {
  const navigation = useAppNavigation();

  const {
    items,
    firstFetching,
    isFirstPage,
    isLastPage,
    fetching,
    error,
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

  const renderArticle = useCallback(({ item }: { item: IArticleSummary }) => {
    return <ArticleBox {...item} />;
  }, []);

  return (
    <View>
      {error ? (
        <View>
          <Error
            title={'Hello'}
            description={'descirption'}
            errCallback={() => getItems('first')}
          />
        </View>
      ) : (
        <View>
          <CursorFlatList
            items={items}
            loading={firstFetching && isFirstPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            fetching={fetching}
            getItems={getItems}
            renderItem={renderArticle}
          />
          {/* <FlatList data={items} renderItem={renderArticle}/> */}
        </View>
      )}
    </View>
  );
};

export default Home;
