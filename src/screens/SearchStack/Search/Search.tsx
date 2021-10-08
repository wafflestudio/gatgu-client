import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntIcon from 'react-native-vector-icons/AntDesign';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { Box, Divider, SearchIcon, VStack } from 'native-base';

import { articleAPI } from '@/apis';
import { ArticleBox, CursorFlatList } from '@/components';
import { GInput } from '@/components/Gatgu';
import HomeShimmer from '@/components/Shimmer/HomeShimmer';
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
    setFetching,
  } = useCursorPagination<IArticleSummary>({
    fetchFunc: (url) => articleAPI.getArticles(url, searchKeyword),
  });

  const {
    recentSearchKeywords,
    addRecentSearchKeyword,
    deleteRecentSearchKeyword,
  } = useRecentSearch();

  useUpdateEffect(() => {
    getItems('first');
  }, [searchKeyword]);

  const handleSearch = useCallback(
    (keyword?: string) => {
      setSearchKeyword(keyword ?? searchInput);
      setSearchResultStage(true);
      setFetching(true);
      addRecentSearchKeyword(keyword ?? searchInput);
    },
    [addRecentSearchKeyword, setFetching, searchInput]
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

  const renderArticles = () => {
    if (firstFetching || fetching) {
      return <HomeShimmer />;
    }

    if (items.length === 0) {
      return <SearchResultEmpty searchKeyword={searchKeyword} />;
    }

    return (
      <CursorFlatList
        items={items}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        fetching={fetching}
        loading={firstFetching}
        getItems={getItems}
        renderItem={renderArticle}
      />
    );
  };

  return (
    <VStack
      backgroundColor={palette.white}
      justifyContent="flex-start"
      flex={1}
    >
      <Box paddingX="20px" paddingY="10px">
        <GInput
          noBorder
          width="full"
          theme="gray"
          value={searchInput}
          placeholder="키워드로 검색"
          InputLeftElement={
            <SearchIcon m={2} size="22px" ml={3} color={palette.blue} />
          }
          InputRightElement={
            searchInput.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchInput('');
                  setSearchResultStage(false);
                }}
                style={{ marginRight: 10 }}
              >
                <AntIcon name="closecircle" size={22} />
              </TouchableOpacity>
            ) : undefined
          }
          onPressOut={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()} // for prevent keyboard dismissing when click input
          onFocus={() => setSearchResultStage(false)}
          onChangeText={setSearchInput}
          onSubmitEditing={() => handleSearch(searchInput)}
        />
      </Box>
      <Divider />
      <View style={{ flex: 1, height: '100%' }} onTouchEnd={Keyboard.dismiss}>
        {isSearchResultStage ? (
          renderArticles()
        ) : (
          <VStack style={{ flex: 1 }}>
            <RecentSearch
              keywords={recentSearchKeywords}
              onKeywordDelete={deleteRecentSearchKeyword}
              onKeywordPress={handleKeywordPress}
            />
          </VStack>
        )}
      </View>
    </VStack>
  );
};

export default Search;
