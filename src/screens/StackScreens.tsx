import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableHighlight, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routes from '@/helpers/routes';
import { Icon } from 'native-base';
import { Button } from '@/components';
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
} = routes;

// TODO: 이거 여기서 정의하는 거보다 각 function 안에서 정의하는 게 낫지 않을까요
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChattingStack = createStackNavigator();
const WriteArticleStack = createStackNavigator();
const SearchStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ArticleDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
    >
      <Drawer.Screen name={Article.name} component={Article.component} />
      {/* TODO: Add this screen: 
      <Drawer.Screen name="ArticleEdit" component={ArticleEditScreen} /> */}
    </Drawer.Navigator>
  );
}

function HomeStackScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Home.name}
        component={Home.component}
        options={{
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.navigate('Notification')}
            >
              <Text>알림 아이콘</Text>
            </TouchableHighlight>
          ),
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

function ProfileStackScreen(): JSX.Element {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Profile.name}
        component={Profile.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name={ProfileModify.name}
        component={ProfileModify.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ProfileStack.Navigator>
  );
}

function WriteArticleStackScreen(): JSX.Element {
  const navigation = useNavigation();

  return (
    <WriteArticleStack.Navigator>
      <WriteArticleStack.Screen
        name={WriteArticle.name}
        component={WriteArticle.component}
        options={{
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            // TODO: must modify; this does only routing but doesn't post article...
            <Button
              title="완료"
              onPress={() => navigation.navigate('Article')}
            />
          ),
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

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
