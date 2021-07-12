import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Search } from './Search';

export enum ESearchStackScreens {
  Search = 'Search',
}
export type TSearchStackParamList = {
  [ESearchStackScreens.Search]: undefined;
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
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
