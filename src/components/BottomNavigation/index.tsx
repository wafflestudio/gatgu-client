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
  WriteArticle,
  AppLoading,
  tarBarOption,
} = navigationRoute;

function BottomNavigation(): JSX.Element {
  return (
    <Tab.Navigator tabBarPosition="bottom" tabBarOptions={tarBarOption}>
      <Tab.Screen
        name={Home.name}
        component={Home.component}
        options={options[Home.name]}
      />
      {/* TODO: modify below to search screen */}
      <Tab.Screen
        name={AppLoading.name}
        component={AppLoading.component}
        options={options[AppLoading.name]}
      />
      <Tab.Screen
        name={WriteArticle.name}
        component={WriteArticle.component}
        options={options[WriteArticle.name]}
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
  /* TODO: modify below to search screen */
  AppLoading: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-home" style={{ color, fontSize: 25 }} />
    ),
  },
  WriteArticle: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-book" style={{ color, fontSize: 25 }} />
    ),
  },
  Chatting: {
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
