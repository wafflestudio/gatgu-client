import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, Text } from 'react-native';

import routes from '@/helpers/routes';

const {
  Home,
  Notification,
  Article,
  Profile,
  WriteArticle,
  ChattingList,
} = routes;

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChattingStack = createStackNavigator();
const WriteArticleStack = createStackNavigator();

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
        name={Article.name}
        component={Article.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
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

function WriteArticleStackScreen() {
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

function ChattingStackScreen() {
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
