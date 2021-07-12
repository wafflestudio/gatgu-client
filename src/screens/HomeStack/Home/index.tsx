import React, { useEffect } from 'react';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { useCursorPagination } from '@/helpers/hooks';
import { IArticleSummary } from '@/types/article';

const Home: React.FC = () => {
  const {
    items,
    firstFetching,
    isFirstPage,
    fetching,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: articleAPI.getArticles,
  });

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
