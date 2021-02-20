import React from 'react';
import { View } from 'react-native';

import SearchBar from '../SearchBar';
import SearchedList from './SearchedList';
import SearchStyle from '../Search.style';

function SearchListScreen(): JSX.Element {
  return (
    <View style={SearchStyle.wrapper}>
      <View style={SearchStyle.searchWrapper}>
        <SearchBar inSearchedList={true} keyword={''} />
      </View>

      <SearchedList />
    </View>
  );
}

export default SearchListScreen;
