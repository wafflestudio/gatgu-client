import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useSelector } from '@/helpers/hooks';

import RecentSearch from './RecentSearch';

function SearchSection(): JSX.Element {
  const { recentSearch } = useSelector((state) => state.search);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RecentSearch tags={recentSearch} />
    </TouchableWithoutFeedback>
  );
}

export default SearchSection;
