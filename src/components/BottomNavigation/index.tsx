import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { Icon } from 'native-base';

import navigationRoute from './navigationRoute';

const Tab = createMaterialTopTabNavigator();

const {
  Home,
  Chatting,
  Profile,
  WriteArticlePage,
  tarBarOption,
} = navigationRoute;

function BottomNavigationTab() {
  return (
    <Tab.Navigator tabBarPosition="bottom" tabBarOptions={tarBarOption}>
      <Tab.Screen
        name={Home.name}
        component={Home.component}
        options={options[Home.name]}
      />
      <Tab.Screen
        name={Chatting.name}
        component={Chatting.component}
        options={options[Chatting.name]}
      />
      <Tab.Screen
        name={Profile.name}
        component={Profile.component}
        options={options[Profile.name]}
      />
      <Tab.Screen
        name={WriteArticlePage.name}
        component={WriteArticlePage.component}
        options={options[WriteArticlePage.name]}
      />
    </Tab.Navigator>
  );
}

const options: { [x: string]: MaterialTopTabNavigationOptions } = {
  Home: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-home" style={{ color, fontSize: 25 }} />
    ),
  },
  Profile: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-add-circle" style={{ color, fontSize: 25 }} />
    ),
  },
  Chatting: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-heart" style={{ color, fontSize: 25 }} />
    ),
  },
  WriteArticlePage: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-book" style={{ color, fontSize: 25 }} />
    ),
  },
};

BottomNavigationTab.displayName = 'BottomNavigationTab';

export default BottomNavigationTab;
