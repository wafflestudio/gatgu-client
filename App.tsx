import React, { useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { setRequesterToken } from '@/apis/BaseInstance';
import { refreshAccessToken } from '@/apis/UserApi';
import BottomNavigation from '@/components/BottomNavigation';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import routes from '@/helpers/routes';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App(): JSX.Element {
  const navigation = useNavigation();

  const initializeApp = async () => {
    // check if refresh token exists
    const refreshToken = await ObjectStorage.getObject(
      asyncStoragekey.REFRESH_TOKEN
    );

    // 없으면 중단
    if (!refreshToken) return;

    // 있으면 정보 받아오기
    try {
      const newTokenResponse = await refreshAccessToken(refreshToken);
      setRequesterToken(newTokenResponse.data.access);
    } catch (err) {
      switch (err.response.data.error_code) {
        case 101: // refresh token 만료
          Alert.alert(err.response.data.detail);
          navigation.navigate('Login');
          break;
        default:
          // cannot reach here: 아마 서버 에러
          break;
      }
    }
  };

  useEffect(() => {
    // check if user data exists
    initializeApp();
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
