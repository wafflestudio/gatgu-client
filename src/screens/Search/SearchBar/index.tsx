import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import SearchBarStyles from './SearchBar.style';
import { StringInput } from '@/components';

interface ISearchBarProps {
  inSearchedList: boolean;
}

function SearchBar({ inSearchedList }: ISearchBarProps): JSX.Element {
  const navigation = useNavigation();

  const [input, setInput] = useState('');

  const onSubmit = () => {
    navigation.navigate('SearchedArticle');
  };

  return (
    <View style={SearchBarStyles.outerBox}>
      <Icon name="ios-search" style={SearchBarStyles.searchIcon} />
      <StringInput
        onTouchStart={() => inSearchedList && navigation.navigate('Search')}
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
