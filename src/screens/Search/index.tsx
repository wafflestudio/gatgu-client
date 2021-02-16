import React from 'react';
import { View } from 'react-native';

import SearchBar from './SearchBar';
import SearchedList from './SearchedList';
function Search() {
  return (
    <View>
      <SearchBar />
      <SearchedList />
    </View>
  );
}

export default Search;
