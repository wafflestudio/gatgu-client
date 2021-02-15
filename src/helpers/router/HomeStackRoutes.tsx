import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Article as ArticleScreen, Home as HomeScreen } from '@/screens';
import { Text, View } from 'react-native';

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AlertScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Alert</Text>
    </View>
  );
}
function ArticleEditScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>ArticleEdit</Text>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Article" component={ArticleScreen} />
      <Drawer.Screen name="ArticleEdit" component={ArticleEditScreen} />
    </Drawer.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ArticleDrawer" component={MyDrawer} />
      <HomeStack.Screen name="Alert" component={AlertScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
