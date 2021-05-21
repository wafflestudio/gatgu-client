import React from 'react';
import { View } from 'react-native';

import { useSelector } from '@/helpers/hooks';

import styles from '../Search.style';
import SearchBar from '../SearchBar/SearchBar';
import SearchedList from './SearchedList/SearchedList';

function SearchListScreen(): JSX.Element {
  const searchText = useSelector((state) => state.search.keyword);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <SearchBar inSearchedList={true} keyword={searchText} />
      </View>

      <SearchedList />
    </View>
  );
}

export default SearchListScreen;
