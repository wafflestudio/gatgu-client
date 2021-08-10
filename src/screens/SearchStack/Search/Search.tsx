import React, { useCallback, useEffect, useState } from 'react';

import { Box, Divider, SearchIcon, VStack } from 'native-base';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { GInput } from '@/components/Gatgu';
import { useCursorPagination } from '@/helpers/hooks';
import { palette } from '@/styles';
import { IArticleSummary } from '@/types/article';

import RecentSearch from '../components/RecentSearch';
import { SearchResultEmpty } from '../components/SearchResultEmpty';
import useRecentSearch from '../hooks/useRecentSearch';

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchResultStage, setSearchResultStage] = useState(false);

  const {
    items,
    firstFetching,
    fetching,
    isFirstPage,
    isLastPage,
    getItems,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: (url) => articleAPI.getArticles(url, searchKeyword),
  });

  const {
    recentSearchKeywords,
    addRecentSearchKeyword,
    deleteRecentSearchKeyword,
  } = useRecentSearch();

  // 초기 렌더링
  useEffect(() => {
    getItems('first');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const handleSearch = useCallback(
    (keyword?: string) => {
      setSearchKeyword(keyword ?? searchInput);
      setSearchResultStage(true);
      addRecentSearchKeyword(keyword ?? searchInput);
    },
    [addRecentSearchKeyword, searchInput]
  );

  const handleKeywordPress = useCallback(
    (keyword: string) => {
      setSearchInput(keyword);
      handleSearch(keyword);
    },
    [handleSearch]
  );

  const renderArticle = React.useCallback(
    ({ item }: { item: IArticleSummary }) => <ArticleBox {...item} />,
    []
  );

  return (
    <VStack
      backgroundColor={palette.white}
      justifyContent="flex-start"
      flex={1}
    >
      <Box paddingX="20px" paddingY="10px">
        <GInput
          width="full"
          theme="gray"
          value={searchInput}
          placeholder="키워드로 검색"
          InputLeftElement={<SearchIcon m={2} />}
          onFocus={() => setSearchResultStage(false)}
          onChangeText={setSearchInput}
          onSubmitEditing={() => handleSearch(searchInput)}
        />
      </Box>
      <Divider />
      {isSearchResultStage ? (
        <CursorFlatList
          items={items}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          fetching={fetching}
          loading={firstFetching}
          ListEmptyComponent={
            <SearchResultEmpty searchKeyword={searchKeyword} />
          }
          getItems={getItems}
          renderItem={renderArticle}
        />
      ) : (
        <VStack>
          <RecentSearch
            keywords={recentSearchKeywords}
            onKeywordDelete={deleteRecentSearchKeyword}
            onKeywordPress={handleKeywordPress}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default Search;
