import React, { useEffect } from 'react';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { PAGE_SIZE } from '@/constants/article';
import { UserArticleActivity } from '@/enums';
import { useCursorPagination } from '@/helpers/hooks';
import { IArticleSummary } from '@/types/article';

interface IUserGatguListProps {
  type: UserArticleActivity;
}

const UserGatguList: React.FC<IUserGatguListProps> = ({ type }) => {
  const {
    isFirstPage,
    items,
    refreshing,
    fetching,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    countPerFetch: PAGE_SIZE,
    fetchFunc: (url) => articleAPI.getUserArticles(url, type, null),
  });

  console.log(`items`, items);
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
      isFirstPage={isFirstPage}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default UserGatguList;
