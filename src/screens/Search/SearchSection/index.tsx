import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useSelector } from '@/helpers/hooks';

import PopularSearch from './PopularSearch';
import RecentSearch from './RecentSearch';
import TagList from './TagList';

function SearchSection(): JSX.Element {
  const { recentSearch, popularSearch } = useSelector((state) => state.search);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TagList />
      <PopularSearch tags={popularSearch} />
      <RecentSearch tags={recentSearch} />
    </TouchableWithoutFeedback>
  );
}

export default SearchSection;
