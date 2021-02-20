import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import SearchBar from './SearchBar';
import SearchStyle from './Search.style';
import SearchSection from './SearchSection';
import { initSearchData } from '@/store/searchedArticleSlice';

function Search(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSearchData());
  }, []);

  return (
    <View style={SearchStyle.wrapper}>
      <View style={SearchStyle.searchWrapper}>
        <SearchBar inSearchedList={false} keyword={''} />
      </View>
      <SearchSection />
    </View>
  );
}

export default Search;
