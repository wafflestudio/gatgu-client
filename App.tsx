import React, { useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import get from 'lodash/get';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { setRequesterToken } from '@/apis/BaseInstance';
import { refreshAccessToken } from '@/apis/UserApi';
import BottomNavigation from '@/components/BottomNavigation';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { StringStorage } from '@/helpers/functions/asyncStorage';
import routes from '@/helpers/routes';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';
import { setAccessToken } from '@/store/userSlice';
import { AuthProvider } from '@/helpers/Chatting/Provider';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App(): JSX.Element {
  const initializeApp = async () => {
    // check if refresh token exists
    const refreshToken = await StringStorage.get(asyncStoragekey.REFRESH_TOKEN);

    // 없으면 중단
    if (!refreshToken) return;

    // 있으면 정보 받아오기
    try {
      const newTokenResponse = await refreshAccessToken(refreshToken);
      const access = get(newTokenResponse, ['data', 'access']);
      const refresh = get(newTokenResponse, ['data', 'refresh']);
      setRequesterToken(access);
      store.dispatch(setAccessToken(access));
      if (refresh) {
        // https://wafflestudio.slack.com/archives/C01LD8Q0Q72/p1622979609312500
        // 이 스레드 해결되고 나면 if문 지워져도 됨
        StringStorage.add(asyncStoragekey.REFRESH_TOKEN, refresh);
      }
    } catch (err) {
      console.log(err);
      switch (err.response.data.error_code) {
        case 101: // refresh token 만료
          Alert.alert(err.response.data.detail);
          break;
        default:
          // cannot reach here: 아마 서버 에러
          break;
      }
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
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
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
