import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components/native';

import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { BottomTabIcon } from '@/assets/BottomTabIndex';
import { AppRoutes } from '@/helpers/routes';
import { palette } from '@/styles';

import ChattingStackScreen, {
  TChattingListStackParamList,
} from '../ChattingListStack/ChattingListStack';
import HomeStackScreen, { THomeStackParamList } from '../HomeStack/HomeStack';
import SearchStackScreen, {
  TSearchStackParamList,
} from '../SearchStack/SearchStack';
import UserStackScreen, { TUserStackParamList } from '../UserStack/UserStack';
import WriteArticleStackScreen, {
  TWriteArticleStackParamList,
} from '../WriteArticleStack/WriteArticleStack';

const tarBarOptions: BottomTabBarOptions = {
  activeTintColor: 'black',
  style: {
    height: 69,
  },
  tabStyle: {
    alignItems: 'center',
    paddingTop: 14.5,
    paddingBottom: 9,
  },
  labelStyle: {
    color: 'black',
    paddingTop: 1.6,
    fontSize: 10,
  },
  keyboardHidesTabBar: true,
};

const StyledTabBarLabel = styled.Text<{ focused: boolean }>`
  color: ${(p) => (p.focused ? palette.dark : palette.gray)};
  padding-top: 2px;
  font-size: 11px;
`;

export type TMainTabsParamList = THomeStackParamList &
  TSearchStackParamList &
  TWriteArticleStackParamList &
  TChattingListStackParamList &
  TUserStackParamList;

const Tab = createBottomTabNavigator<TMainTabsParamList>();

function MainTabs(): JSX.Element {
  return (
    <Tab.Navigator tabBarOptions={tarBarOptions}>
      <Tab.Screen
        name={AppRoutes.Home}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.homeDark />
            ) : (
              <BottomTabIcon.home />
            ),
          tabBarLabel: ({ focused }) => (
            <StyledTabBarLabel focused={focused}>홈</StyledTabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={AppRoutes.Search}
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.searchDark />
            ) : (
              <BottomTabIcon.search />
            ),
          tabBarLabel: ({ focused }) => (
            <StyledTabBarLabel focused={focused}>검색</StyledTabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={AppRoutes.WriteArticle}
        component={WriteArticleStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.writeDark />
            ) : (
              <BottomTabIcon.write />
            ),
          tabBarLabel: ({ focused }) => (
            <StyledTabBarLabel focused={focused}>글쓰기</StyledTabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={AppRoutes.ChattingList}
        component={ChattingStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.chatDark />
            ) : (
              <BottomTabIcon.chat />
            ),
          tabBarLabel: ({ focused }) => (
            <StyledTabBarLabel focused={focused}>채팅</StyledTabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={AppRoutes.UserStack}
        component={UserStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.etcDark />
            ) : (
              <BottomTabIcon.etc />
            ),
          tabBarLabel: ({ focused }) => (
            <StyledTabBarLabel focused={focused}>더보기</StyledTabBarLabel>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
