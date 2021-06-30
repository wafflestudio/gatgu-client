import React from 'react';

import { NavigationProp, NavigatorScreenParams } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import logo from '@/assets/icons/Logo';
import { AppRoutes } from '@/helpers/routes';

import ArticleStackScreen, {
  TArticleStackScreenParamList,
} from '../ArticleStack/ArticleStack';
import Home from './Home';
import Notification from './Notification';

export enum EHomeStackScreens {
  Home = 'Home',
  Notification = 'Notification',
  ArticleStack = 'ArticleStack',
}

export type THomeStackParamList = {
  [EHomeStackScreens.Home]: undefined;
  [EHomeStackScreens.Notification]: undefined;
  [EHomeStackScreens.ArticleStack]: NavigatorScreenParams<TArticleStackScreenParamList>;
} & TArticleStackScreenParamList;

const HomeStack = createStackNavigator<THomeStackParamList>();

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={EHomeStackScreens.Home}
        component={Home}
        options={{
          headerTitle: () => (
            <logo.subLogo style={{ width: 94.4, height: 30 }} />
          ),
          headerRightContainerStyle: { paddingRight: 10, paddingTop: 5 },
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={EHomeStackScreens.Notification}
        component={Notification}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={EHomeStackScreens.ArticleStack}
        component={ArticleStackScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
