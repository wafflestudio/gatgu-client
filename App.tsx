import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigation from '@/components/BottomNavigation';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import routes from '@/helpers/routes';
import { AppLoading } from '@/screens';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';
import { setInfo } from '@/store/userSlice';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [userLoaded, setUserLoaded] = useState(false);

  const loadUserData = useCallback(() => {
    ObjectStorage.getObject(asyncStoragekey.USER)
      .then((data) => {
        if (data) store.dispatch(setInfo(data));
        setUserLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setUserLoaded(true);
      });
  }, []);

  useEffect(() => {
    // check if user data exists
    loadUserData();
  }, []);

  if (!userLoaded) {
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
