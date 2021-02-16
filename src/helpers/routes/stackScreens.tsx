import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, Text } from 'react-native';

import screenRoutes from './screenRoutes';

const {
  Home,
  Notification,
  Article,
  Profile,
  WriteArticle,
  ChattingList,
} = screenRoutes;

// TODO: debate
// 이거 거의 스크린마다 하나씩 있는 꼴일 텐데 한 파일에 이렇게 써도 될까요?
export function HomeStackScreen(): JSX.Element {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Home.name}
        component={Home.screen}
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
      <Stack.Screen
        name={Notification.name}
        component={Notification.screen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={Article.name}
        component={Article.screen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function ProfileStackScreen(): JSX.Element {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Profile.name}
        component={Profile.screen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function WriteArticleStackScreen(): JSX.Element {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WriteArticle.name}
        component={WriteArticle.screen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function ChattingStackScreen(): JSX.Element {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ChattingList.name}
        component={ChattingList.screen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
