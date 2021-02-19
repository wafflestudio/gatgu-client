import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import SearchBarStyles from './SearchBar.style';
import { StringInput } from '@/components';

function SearchBar(): JSX.Element {
  const navigation = useNavigation();

  const [input, setInput] = useState('');

  const onSubmit = () => {
    alert(`${input}을 검색하겠다!`);
  };

  return (
    <View
      style={SearchBarStyles.outerBox}
      // onTouchStart={() => navigation.navigate('SearchedArticle')}
    >
      <Icon name="ios-search" style={SearchBarStyles.searchIcon} />
      <StringInput
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
