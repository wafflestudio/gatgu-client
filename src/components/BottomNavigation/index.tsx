import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from '@/helpers/routes/tabScreens';

import { Icon } from 'native-base';

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

const tarBarOption = {
  showIcon: true,
  showLabel: false,
  activeTintColor: '#000',
  inactiveTintColor: '#d1cece',
  indicatorStyle: {
    backgroundColor: 'white',
  },
  style: {
    height: 60,
  },
};

function TabBar(): JSX.Element {
  return <>{BottomNavigation(tarBarOption, options)}</>;
}

export default TabBar;
