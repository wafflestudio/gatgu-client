import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Search from '.';
import SearchedList from './SearchedArticle/SearchedList';

export enum ESearchStackScreens {
  Search = 'Search',
  SearchResult = 'SearchResult',
}
export type TSearchStackParamList = {
  [ESearchStackScreens.Search]: undefined;
  [ESearchStackScreens.SearchResult]: {
    keyword: string;
  };
};

const SearchStack = createStackNavigator<TSearchStackParamList>();

const SearchStackScreen: React.FC = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={ESearchStackScreens.Search}
        component={Search}
        options={{
          title: '검색',
          headerTitleAlign: 'center',
        }}
      />
      <SearchStack.Screen
        name={ESearchStackScreens.SearchResult}
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
