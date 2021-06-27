import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useSelector } from '@/helpers/hooks';
import { initSearchData } from '@/store/searchSlice';

import styles from './Search.style';
import SearchBar from './SearchBar';
import SearchSection from './SearchSection';

function Search(): JSX.Element {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.keyword);

  useEffect(() => {
    // set recent keyword
    dispatch(initSearchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <SearchBar inSearchedList={false} keyword={keyword} />
      </View>
      <SearchSection />
    </View>
  );
}

export default Search;
