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
    firstFetching,
    fetching,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    countPerFetch: PAGE_SIZE,
    fetchFunc: (url) => articleAPI.getUserArticles(url, type, null),
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
      loading={firstFetching}
      isFirstPage={isFirstPage}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default UserGatguList;
