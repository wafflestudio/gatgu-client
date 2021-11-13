import React from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NativeBaseProvider } from 'native-base';

import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import store from '@/store/rootStore';

import usePushNotification from '../hooks/usePushNotification';
import {
  useAppExit,
  useAutoLogin,
  useEffectOnceAfterAppLoaded,
  usePushNotificationInit,
} from './hooks';

const queryClient = new QueryClient();

const AppBootstrap: React.FC = ({ children }) => {
  useAppExit();
  usePushNotificationInit();

  const { authLoading } = useAutoLogin();
  const { handlePermission } = usePushNotification();

  const appLoading = [authLoading].some(Boolean);

  useEffectOnceAfterAppLoaded(() => {
    handlePermission();
  }, appLoading);

  React.useEffect(() => {
    if (!appLoading) {
      SplashScreen.hide();
    }
  }, [appLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GatguWebsocket.Provider>
          <NativeBaseProvider>{children}</NativeBaseProvider>
        </GatguWebsocket.Provider>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppBootstrap;
