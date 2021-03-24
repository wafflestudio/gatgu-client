import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

import { useSelector } from '@/helpers/hooks';

import RecentSearch from './RecentSearch';
import TagList from './TagList';

function SearchSection(): JSX.Element {
  const { recentSearch } = useSelector((state) => state.search);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TagList />
      {/* <PopularSearch tags={popularSearch} /> */}
      <RecentSearch tags={recentSearch} />
    </TouchableWithoutFeedback>
  );
}

export default SearchSection;
