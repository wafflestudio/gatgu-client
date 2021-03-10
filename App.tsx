import React, { useRef } from 'react';
import { SafeAreaView, Platform, StatusBar, Text } from 'react-native';
import {
  useFonts,
  NotoSansKR_500Medium,
  NotoSansKR_400Regular,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import BottomNavigation from '@/components/BottomNavigation';
import routes from '@/helpers/routes';
import { AppLoading } from '@/screens';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

function App(): JSX.Element {
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
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ChattingRoom.name}
              component={ChattingRoom.component}
              options={{
                headerShown: false,
                // eslint-disable-next-line react/display-name
                header: () => <></>,
              }}
            />
            <Stack.Screen
              name={Login.name}
              component={Login.component}
              options={{ title: '로그인' }}
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
