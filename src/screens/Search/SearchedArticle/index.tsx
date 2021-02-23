import React from 'react';
import { View } from 'react-native';

import { useSelector } from '@/helpers/hooks';
import SearchBar from '../SearchBar';
import SearchedList from './SearchedList';
import SearchStyle from '../Search.style';

function SearchListScreen(): JSX.Element {
  const searchText = useSelector((state) => state.search.keyword);

  return (
    <View style={SearchStyle.wrapper}>
      <View style={SearchStyle.searchWrapper}>
        <SearchBar inSearchedList={true} keyword={searchText} />
      </View>

      <SearchedList />
    </View>
  );
}

export default SearchListScreen;
