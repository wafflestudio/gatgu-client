import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { StringInput } from '@/components';
import { useKeywordDispatch } from '@/helpers/hooks';
import { GetArticleSumStatus, SearchType } from '@/constants/article';
import { searchArticles } from '@/store/searchSlice';

import styles from './SearchBar.style';

interface ISearchBarProps {
  inSearchedList: boolean;
  keyword: string;
}

function SearchBar({ inSearchedList, keyword }: ISearchBarProps): JSX.Element {
  const dispatch = useDispatch();
  const keywordDispatch = useKeywordDispatch();
  const navigation = useNavigation();

  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const onSubmit = () => {
    dispatch(
      searchArticles(GetArticleSumStatus.FIRST, input, SearchType.TITLE)
    );
    keywordDispatch(input);
    setInput('');
    navigation.navigate('SearchedArticle');
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
