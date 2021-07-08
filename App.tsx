import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import get from 'lodash/get';

import AppRouter from '@/App.router';
import { setRequesterToken } from '@/apis/BaseInstance';
import { refreshAccessToken } from '@/apis/UserApi';
import { asyncStoragekey } from '@/constants/asyncStorage';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import { StringStorage } from '@/helpers/functions/asyncStorage';
import store from '@/store/rootStore';
import { setAccessToken } from '@/store/userSlice';

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
        <GatguWebsocket.Provider>
          <AppRouter />
        </GatguWebsocket.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
