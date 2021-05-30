import React, { useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigation from '@/components/BottomNavigation';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import routes from '@/helpers/routes';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';
import { setToken } from '@/store/userSlice';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App(): JSX.Element {
  useEffect(() => {
    // check if user data exists
    ObjectStorage.getObject(asyncStoragekey.TOKEN)
      .then((data) => {
        if (data) {
          store.dispatch(setToken(data));
        } else {
          ObjectStorage.removeObject(asyncStoragekey.TOKEN);
        }
      })
      .catch(() => {
        ObjectStorage.removeObject(asyncStoragekey.TOKEN);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView
            style={{
              flex: 1,
              marginTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    </QueryClientProvider>
  );
}

export default App;
