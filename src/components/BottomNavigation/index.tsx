import React from 'react';

import { Icon } from 'native-base';

import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import { BottomTabIcon } from '@/assets/Icon';
import TabIcon from '@/assets/TabIcon';

import navigationRoute from './navigationRoute';

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
    tabBarIcon: ({ color }: any): JSX.Element =>
      // <Icon name="ios-home" style={[{ color }, BottomNavigationStyle.Icon]} />
      color === 'black' ? <BottomTabIcon.homeDark /> : <BottomTabIcon.home />,
    tabBarLabel: '홈',
  },
  Search: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element =>
      color === 'black' ? (
        <BottomTabIcon.searchDark />
      ) : (
        <BottomTabIcon.search />
      ),
    tabBarLabel: '검색',
  },
  WriteArticle: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element =>
      color === 'black' ? <BottomTabIcon.writeDark /> : <BottomTabIcon.write />,
    tabBarLabel: '글쓰기',
  },
  ChattingList: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element =>
      color === 'black' ? <BottomTabIcon.chatDark /> : <BottomTabIcon.chat />,
    tabBarLabel: '채팅',
  },
  Profile: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element =>
      color === 'black' ? <BottomTabIcon.etcDark /> : <BottomTabIcon.etc />,
    tabBarLabel: '더보기',
  },
};

export default BottomNavigation;
