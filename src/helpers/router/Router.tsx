import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabRoutes from './TabRoutes';
import { Text, View, Button } from 'react-native';

const RootStack = createStackNavigator();

// not implemented yet
function ChatScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Chat</Text>
    </View>
  );
}

function Router(): JSX.Element {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={TabRoutes}
      />
      <RootStack.Screen name="ChatRoom" component={ChatScreen} />
    </RootStack.Navigator>
  );
}

export default Router;
