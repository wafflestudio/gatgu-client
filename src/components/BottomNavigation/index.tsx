import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import navigationRoute from './navigationRoute';

const Tab = createBottomTabNavigator();

const {
  Home,
  ChattingList,
  Profile,
  WriteArticle,
  tarBarOption,
} = navigationRoute;

function BottomNavigation(): JSX.Element {
  return (
    <Tab.Navigator tabBarOptions={tarBarOption}>
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

const options: { [x: string]: BottomTabNavigationOptions } = {
  Home: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-home" style={{ color, fontSize: 25 }} />
    ),
  },
  /* TODO: modify below to search screen */
  Search: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-search" style={{ color, fontSize: 25 }} />
    ),
  },
  WriteArticle: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-book" style={{ color, fontSize: 25 }} />
    ),
  },
  ChattingList: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-heart" style={{ color, fontSize: 25 }} />
    ),
  },
  Profile: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-add-circle" style={{ color, fontSize: 25 }} />
    ),
  },
};

export default BottomNavigation;
