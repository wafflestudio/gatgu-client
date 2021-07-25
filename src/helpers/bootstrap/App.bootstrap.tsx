import React from 'react';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NativeBaseProvider } from 'native-base';

import AppLoadingTemplate from '@/components/AppLoading';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import store from '@/store/rootStore';

import { useAutoLogin } from './hooks';

const queryClient = new QueryClient();

const AppBootstrap: React.FC = ({ children }) => {
  const { authLoading } = useAutoLogin();

  const appLoading = [authLoading].some(Boolean);

  if (appLoading) {
    return <AppLoadingTemplate />;
  }
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
