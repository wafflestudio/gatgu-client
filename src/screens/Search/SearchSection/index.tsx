import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

import PopularSearch from './PopularSearch';
import RecentSearch from './RecentSearch';
import TagList from './TagList';

function SearchSection(): JSX.Element {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TagList />
      <PopularSearch />
      <RecentSearch />
    </TouchableWithoutFeedback>
  );
}

export default SearchSection;
