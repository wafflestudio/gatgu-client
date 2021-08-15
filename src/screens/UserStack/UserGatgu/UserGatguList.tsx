import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/core';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { GText } from '@/components/Gatgu';
import HomeShimmer from '@/components/Shimmer/HomeShimmer';
import { PAGE_SIZE } from '@/constants/article';
import { UserArticleActivity } from '@/enums';
import { useCursorPagination } from '@/helpers/hooks';
import { AppRoutes } from '@/helpers/routes';
import { IArticleSummary } from '@/types/article';

import UserGatguEmpty from '../components/UserGatguEmpty/UserGatguEmpty';

interface IUserGatguListProps {
  type: UserArticleActivity;
}

const UserGatguList: React.FC<IUserGatguListProps> = ({ type }) => {
  const navigation = useNavigation();

  const {
    isFirstPage,
    isLastPage,
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

  if (fetching) {
    return <HomeShimmer />;
  }

  if (!fetching && !items.length) {
    const title =
      type === UserArticleActivity.Hosted
        ? '아직 같구에 참여하지 않으셨네요!'
        : '같구 글을 올려볼까요?';

    const renderContent = () => {
      if (type === UserArticleActivity.Hosted) {
        return (
          <GText
            touchable
            color="gray"
            textDecorationLine="underline"
            onPress={() => navigation.navigate(AppRoutes.WriteArticle)}
          >
            모집글 쓰러 가기
          </GText>
        );
      }

      return (
        <GText
          touchable
          color="gray"
          textDecorationLine="underline"
          onPress={() => navigation.navigate(AppRoutes.Home)}
        >
          같구글 확인하기
        </GText>
      );
    };

    return <UserGatguEmpty title={title} content={renderContent()} />;
  }

  return (
    <CursorFlatList
      items={items}
      loading={firstFetching}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      fetching={fetching}
      getItems={getItems}
      renderItem={renderArticle}
    />
  );
};

export default UserGatguList;
