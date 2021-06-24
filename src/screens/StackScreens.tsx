import React, { useCallback, useState } from 'react';
import { TouchableHighlight, View, Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import { Icon } from 'native-base';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { removeRequesterToken } from '@/apis/BaseInstance';
import { logout, modifyMyInfo } from '@/apis/UserApi';
import Logo from '@/assets/Logo';
import { Button } from '@/components';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { StringStorage } from '@/helpers/functions/asyncStorage';
import { isValidNickname } from '@/helpers/functions/validate';
import routes from '@/helpers/routes';
import { USER_DETAIL } from '@/queryKeys';
import { IUserModify } from '@/screens/ProfileModify';
import { RootState } from '@/store';
import { clearAccessToken } from '@/store/userSlice';
import { palette, typo } from '@/styles';

import DrawerTemplate from './Drawer';

const {
  Home,
  Notification,
  Article,
  Profile,
  WriteArticle,
  ChattingList,
  Search,
  SearchedArticle,
  ProfileModify,
  SignUp,
  TOS,
  EditArticle,
  UserGatgu,
} = routes;

const Drawer = createDrawerNavigator();
function ArticleDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name={Article.name} component={Article.component} />
      <Drawer.Screen
        name={EditArticle.name}
        component={EditArticle.component}
      />
    </Drawer.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen(): JSX.Element {
  const navigation = useNavigation();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Home.name}
        component={Home.component}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Logo.subLogo style={{ width: 94.4, height: 30 }} />
          ),
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <TouchableHighlight
              onPress={() => {
                //
              }}
            >
              <Icon type={'Ionicons'} name="ios-notifications-outline" />
            </TouchableHighlight>
          ),
          headerRightContainerStyle: { paddingRight: 10, paddingTop: 5 },
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={Notification.name}
        component={Notification.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="Article"
        component={ArticleDrawer}
        options={{
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Icon name="menu" />
            </TouchableHighlight>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen(): JSX.Element {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={Profile.name} component={Profile.component} />
      <ProfileStack.Screen
        name={ProfileModify.name}
        component={ProfileModify.component}
      />
      <ProfileStack.Screen
        name={UserGatgu.name}
        component={UserGatgu.component}
      />
    </ProfileStack.Navigator>
  );
}

const WriteArticleStack = createStackNavigator();
function WriteArticleStackScreen(): JSX.Element {
  return (
    <WriteArticleStack.Navigator>
      <WriteArticleStack.Screen
        name={WriteArticle.name}
        component={WriteArticle.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

const ChattingStack = createStackNavigator();
function ChattingStackScreen(): JSX.Element {
  return (
    <ChattingStack.Navigator>
      <ChattingStack.Screen
        name={ChattingList.name}
        component={ChattingList.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ChattingStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen(): JSX.Element {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={Search.name}
        component={Search.component}
        options={{
          title: '검색',
          headerTitleAlign: 'center',
        }}
      />
      <SearchStack.Screen
        name={SearchedArticle.name}
        component={SearchedArticle.component}
        options={{
          title: '검색결과',
          headerTitleAlign: 'center',
        }}
      />
    </SearchStack.Navigator>
  );
}

const SignUpStack = createStackNavigator();
function SignUpStackScreen(): JSX.Element {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name={SignUp.name}
        component={SignUp.component}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
      <SignUpStack.Screen
        name={TOS.name}
        component={TOS.component}
        options={{
          title: '약관 동의',
          headerTitleAlign: 'center',
        }}
      />
    </SignUpStack.Navigator>
  );
}

export {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
  SearchStackScreen,
  SignUpStackScreen,
};
