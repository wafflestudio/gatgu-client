import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { Icon } from 'native-base';

import { StringInput } from '@/components';
import { useKeywordDispatch } from '@/helpers/hooks';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';

import styles from './SearchBar.style';

interface ISearchBarProps {
  inSearchedList: boolean;
  keyword: string;
}

function SearchBar({ inSearchedList, keyword }: ISearchBarProps): JSX.Element {
  const keywordDispatch = useKeywordDispatch();
  const navigation = useAppNavigation();

  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const onSubmit = () => {
    keywordDispatch(input);
    setInput('');
    navigation.navigate('SearchResult', { keyword });
  };

  return (
    <View style={styles.outerBox}>
      <Icon name="ios-search" style={styles.searchIcon} />
      <StringInput
        onTouchStart={() => {
          inSearchedList && navigation.navigate('Search');
        }}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={onSubmit}
        placeholder={'키워드로 검색'}
        style={[styles.text, styles.searchText]}
        placeholderStyle={[styles.text, styles.placeholder]}
      />
    </View>
  );
}

export default SearchBar;
