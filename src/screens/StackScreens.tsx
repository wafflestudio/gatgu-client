import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableHighlight, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routes from '@/helpers/routes';
import { Icon } from 'native-base';
import { Button } from '@/components';

const {
  Home,
  Notification,
  Article,
  Profile,
  WriteArticle,
  ChattingList,
} = routes;

// TODO: 이거 여기서 정의하는 거보다 각 function 안에서 정의하는 게 낫지 않을까요
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChattingStack = createStackNavigator();
const WriteArticleStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ArticleDrawer(): JSX.Element {
  return (
    <Drawer.Navigator drawerPosition="right">
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

export {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
};
