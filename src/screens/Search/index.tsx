import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import SearchBar from './SearchBar';
import SearchStyle from './Search.style';
import SearchSection from './SearchSection';
import { initSearchData } from '@/store/searchedArticleSlice';
import { useSelector } from '@/helpers/hooks';

function Search(): JSX.Element {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.keyword);
  useEffect(() => {
    // set popular keyword, recent keyword
    dispatch(initSearchData());
  }, []);

  return (
    <View style={SearchStyle.wrapper}>
      <View style={SearchStyle.searchWrapper}>
        <SearchBar inSearchedList={false} keyword={keyword} />
      </View>
      <SearchSection />
    </View>
  );
}

export default Search;
