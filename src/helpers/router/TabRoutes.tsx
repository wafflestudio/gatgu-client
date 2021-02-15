import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  WriteArticle as WriteScreen,
  Profile as ProfileScreen,
  ChattingList as ChatListScreen,
} from '@/screens';
import { Text, View, Button } from 'react-native';
import HomeStackScreen from './HomeStackRoutes';

const Tab = createMaterialBottomTabNavigator();

// Not yet implemented
function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Search</Text>
    </View>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Write" component={WriteScreen} />
      <Tab.Screen name="ChatList" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabScreen;
