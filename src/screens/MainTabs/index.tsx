import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabIcon } from '@/assets/Icon';

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

const tarBarOptions = {
  activeTintColor: 'black',
  style: {
    height: 69,
    paddingTop: 14.5,
    paddingBottom: 9,
  },
  labelStyle: {
    color: 'black',
    paddingTop: 1.6,
    fontSize: 10,
  },
};

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
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.homeDark />
            ) : (
              <BottomTabIcon.home />
            ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.searchDark />
            ) : (
              <BottomTabIcon.search />
            ),
          tabBarLabel: '검색',
        }}
      />
      <Tab.Screen
        name="WriteArticle"
        component={WriteArticleStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.writeDark />
            ) : (
              <BottomTabIcon.write />
            ),
          tabBarLabel: '글쓰기',
        }}
      />
      <Tab.Screen
        name="ChattingList"
        component={ChattingStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.chatDark />
            ) : (
              <BottomTabIcon.chat />
            ),
          tabBarLabel: '채팅',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserStackScreen}
        options={{
          tabBarIcon: ({ color }: any): JSX.Element =>
            color === 'black' ? (
              <BottomTabIcon.etcDark />
            ) : (
              <BottomTabIcon.etc />
            ),
          tabBarLabel: '더보기',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
