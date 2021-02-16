import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import componentRoutes from './componentRoutes';

const { Home, WriteArticle, ChattingList, Profile } = componentRoutes;

export function BottomNavigation(
  tabBarOptions: any,
  options: any
): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={Home.name}
        component={Home.component}
        options={options[Home.name]}
      />
      {/* TODO: modify below to search screen */}
      <Tab.Screen
        name={'Search'}
        component={Home.component}
        options={options['Search']}
      />
      <Tab.Screen
        name={WriteArticle.name}
        component={WriteArticle.component}
        options={options[WriteArticle.name]}
      />
      <Tab.Screen
        name={ChattingList.name}
        component={ChattingList.component}
        options={options[ChattingList.name]}
      />
      <Tab.Screen
        name={Profile.name}
        component={Profile.component}
        options={options[Profile.name]}
      />
    </Tab.Navigator>
  );
}
