import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import navigationRoute from './navigationRoute';
import { Icon } from 'native-base';

const Tab = createBottomTabNavigator();

const {
  Home,
  ChattingList,
  Profile,
  WriteArticle,
  tarBarOption,
  Search,
} = navigationRoute;

function BottomNavigation(): JSX.Element {
  return (
    <Tab.Navigator tabBarOptions={tarBarOption}>
      <Tab.Screen
        name={Home.name}
        component={Home.component}
        options={options[Home.name]}
      />
      <Tab.Screen
        name={Search.name}
        component={Search.component}
        options={options[Search.name]}
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
