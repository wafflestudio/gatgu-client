import React, { useCallback, useState } from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import {
  useFonts,
  NotoSansKR_500Medium,
  NotoSansKR_400Regular,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';

import BottomNavigation from '@/components/BottomNavigation';
import routes from '@/helpers/routes';
import { AppLoading } from '@/screens';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';
import { ObjectStorage, objKeySet } from '@/helpers/functions/asyncStorage';
import { setInfo } from '@/store/userSlice';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [userLoaded, setUserLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_700Bold,
  });

  const dispatch = useDispatch();

  const loadUserData = useCallback(() => {
    ObjectStorage.getObject(objKeySet.user)
      .then((data) => {
        if (data) dispatch(setInfo(data));
        setUserLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setUserLoaded(true);
      });
  }, [dispatch]);

  useState(() => {
    // check if user data exists
    loadUserData();
  }, []);

  if (!fontsLoaded || !userLoaded) {
    return <AppLoading />;
  }
  return (
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
  );
}

function AppProvider(): JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppProvider;
