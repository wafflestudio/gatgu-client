import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import navigationRoute from './navigationRoute';
import { Icon } from 'native-base';
import BottomNavigationStyle from './BottomNavigation.style';

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
      <Icon name="ios-home" style={[{ color }, BottomNavigationStyle.Icon]} />
    ),
    tabBarLabel: '홈',
  },
  Search: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-search" style={[{ color }, { fontSize: 30 }]} />
    ),
    tabBarLabel: '검색',
  },
  WriteArticle: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon name="ios-add-circle" style={[{ color }, { fontSize: 31 }]} />
    ),
    tabBarLabel: '글쓰기',
  },
  ChattingList: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon
        type={'Ionicons'}
        name="chatbubble-outline"
        style={[{ color }, BottomNavigationStyle.Icon]}
      />
    ),
    tabBarLabel: '채팅',
  },
  Profile: {
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ color }: any): JSX.Element => (
      <Icon
        name="ellipsis-horizontal-circle"
        type={'Ionicons'}
        style={[{ color }, { fontSize: 32 }]}
      />
    ),
    tabBarLabel: '더보기',
  },
};

export default BottomNavigation;
