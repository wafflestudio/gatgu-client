import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import SearchBarStyles from './SearchBar.style';
import { StringInput } from '@/components';
import { useKeywordDispatch } from '@/helpers/hooks';

interface ISearchBarProps {
  inSearchedList: boolean;
  keyword: string;
}

function SearchBar({ inSearchedList, keyword }: ISearchBarProps): JSX.Element {
  const keywordDispatch = useKeywordDispatch();
  const navigation = useNavigation();

  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const onSubmit = () => {
    keywordDispatch(input);
    setInput('');
    navigation.navigate('SearchedArticle');
  };

  return (
    <View style={SearchBarStyles.outerBox}>
      <Icon name="ios-search" style={SearchBarStyles.searchIcon} />
      <StringInput
        onTouchStart={() => {
          inSearchedList && navigation.navigate('Search');
        }}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={onSubmit}
        placeholder={'키워드로 검색'}
        style={[SearchBarStyles.text, SearchBarStyles.searchText]}
        placeholderStyle={[SearchBarStyles.text, SearchBarStyles.placeholder]}
      />
    </View>
  );
}

export default SearchBar;
