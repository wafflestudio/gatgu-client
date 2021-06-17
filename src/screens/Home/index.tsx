import React, { useEffect } from 'react';

import _ from 'lodash';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { useCursorPagination } from '@/helpers/hooks';
import { IArticleSummary } from '@/types/article';

const Home: React.FC = () => {
  const {
    items,
    refreshing,
    fetching,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: articleAPI.getArticles,
  });

  // 초기 렌더링
  useEffect(() => {
    getItems('first');
  }, []);

  const renderArticle = ({ item }: { item: IArticleSummary }) => (
    <ArticleBox {...item} />
  );

  return (
    <CursorFlatList
      items={items}
      refreshing={refreshing}
      isFirstPage={false}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default Home;
