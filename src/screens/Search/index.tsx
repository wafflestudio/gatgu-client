import React from 'react';
import { View } from 'react-native';

import SearchBar from './SearchBar';
import SearchStyle from './Search.style';
import SearchSection from './SearchSection';

function Search(): JSX.Element {
  return (
    <View style={SearchStyle.wrapper}>
      <View style={SearchStyle.searchWrapper}>
        <SearchBar inSearchedList={false} />
      </View>
      <SearchSection />
    </View>
  );
}

export default Search;
