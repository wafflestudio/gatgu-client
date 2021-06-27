import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Search from '.';
import SearchedList from './SearchedArticle/SearchedList';

export type TSearchStackParamList = {
  Search: undefined;
  SearchResult: {
    keyword: string;
  };
};

const SearchStack = createStackNavigator<TSearchStackParamList>();

const SearchStackScreen: React.FC = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          title: '검색',
          headerTitleAlign: 'center',
        }}
      />
      <SearchStack.Screen
        name="SearchResult"
        component={SearchedList}
        options={{
          title: '검색결과',
          headerTitleAlign: 'center',
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
