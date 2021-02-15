import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { Home, Notification } from '@/screens';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const HomeStack = createStackNavigator();

function HomeStackScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
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
        name="Notification"
        component={Notification}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
}

export { HomeStackScreen };
