import React, { useEffect, useLayoutEffect } from 'react';

import { articleAPI } from '@/apis';
import NotifcationIcon from '@/assets/icons/Notification/notification.svg';
import { ArticleBox, CursorFlatList } from '@/components';
import Error from '@/components/Error';
import GIconButton from '@/components/Gatgu/GIconButton/GIconButton';
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
      // headerRight: () => (
      //   <GIconButton
      //     onPress={() => {
      //       navigation.navigate(AppRoutes.Notification);
      //     }}
      //   >
      //     <NotifcationIcon />
      //   </GIconButton>
      // ),
    });
  }, [navigation]);

  // 초기 렌더링
  useEffect(() => {
    getItems('first');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderArticle = React.useCallback(
    ({ item }: { item: IArticleSummary }) => <ArticleBox {...item} />,
    []
  );

  if (error) {
    console.error(error);
    return (
      <Error
        title="오류 발생"
        description="모집글들을 불러오지 못했습니다. 다시 시도해주세요"
        loading={fetching}
        errCallback={() => getItems('first')}
      />
    );
  }

  if (firstFetching) {
    return <HomeShimmer />;
  }

  return (
    <CursorFlatList
      items={items}
      loading={firstFetching && isFirstPage}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default Home;
