import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import logo from '@/assets/icons/Logo';

import ArticleStackScreen, {
  TArticleStackScreenParamList,
} from '../ArticleStack/ArticleStack';
import Home from './Home';
import Notification from './Notification';

export type THomeStackParamList = {
  Home: undefined;
  Notification: undefined;
} & TArticleStackScreenParamList;

const HomeStack = createStackNavigator<THomeStackParamList>();

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
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
        name="Notification"
        component={Notification}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen name="Article" component={ArticleStackScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
