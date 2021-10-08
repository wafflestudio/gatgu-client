import React, { useEffect } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { TAppStackParamList } from '@/App.router';
import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import Error from '@/components/Error';
import { RESET_SCREEN } from '@/constants/navigateOption';
import { useCursorPagination } from '@/helpers/hooks';
import { IArticleSummary } from '@/types/article';

import HomeShimmer from '../../../components/Shimmer/HomeShimmer';
import { EHomeStackScreens } from '../HomeStack';

const Home: React.FC = () => {
  const route = useRoute<
    RouteProp<TAppStackParamList, EHomeStackScreens.Home>
  >();

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

  // 초기 렌더링
  useEffect(() => {
    getItems('first');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (route.params?.navigateFlag === RESET_SCREEN) {
      getItems('first');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

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
