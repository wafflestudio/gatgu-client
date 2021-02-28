import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {
  useFonts,
  NotoSansKR_500Medium,
  NotoSansKR_400Regular,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';
import { createStackNavigator } from '@react-navigation/stack';
import store from '@/store/rootStore';
import { AppLoading } from '@/screens';
import { SafeAreaView } from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';
import routes from '@/helpers/routes';
import { SignUpStackScreen } from '@/screens/StackScreens';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ChattingRoom.name}
              component={ChattingRoom.component}
            />
            <Stack.Screen
              name={Login.name}
              component={Login.component}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={SignUp.name}
              component={SignUpStackScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
