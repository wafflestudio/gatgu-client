import React from 'react';
import { View } from 'react-native';

import SearchBar from './SearchBar';
import SearchedList from './SearchedList';
import SearchStyle from './Search.style';

function Search() {
  return (
    <View style={SearchStyle.wrapper}>
      <SearchBar />
      <SearchedList />
    </View>
  );
}

export default Search;
