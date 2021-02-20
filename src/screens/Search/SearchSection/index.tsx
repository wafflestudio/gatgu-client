import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

import PopularSearch from './PopularSearch';
import RecentSearch from './RecentSearch';
import TagList from './TagList';
import { useShallowSelector } from '@/helpers/hooks';

function SearchSection(): JSX.Element {
  const { recentSearch, popularSearch } = useShallowSelector(
    (state) => state.search
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TagList />
      <PopularSearch tags={popularSearch} />
      <RecentSearch tags={recentSearch} />
    </TouchableWithoutFeedback>
  );
}

export default SearchSection;
