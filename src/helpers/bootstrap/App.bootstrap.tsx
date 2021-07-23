import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';

import AppLoadingTemplate from '@/components/AppLoading';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import store from '@/store/rootStore';

import {
  useAutoLogin,
  useEffectOnceAfterAppLoaded,
  usePushNotification,
} from './hooks';
import { navigationRef } from './rootNavigation';
import { linking } from './utils/navigation';

const queryClient = new QueryClient();

const AppBootstrap: React.FC = ({ children }) => {
  const { authLoading } = useAutoLogin();
  const { handlePermission } = usePushNotification();

  const appLoading = [authLoading].some(Boolean);

  useEffectOnceAfterAppLoaded(() => {
    handlePermission();
  }, appLoading);

  if (appLoading) {
    return <AppLoadingTemplate />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GatguWebsocket.Provider>
          <NativeBaseProvider>
            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              fallback={<AppLoadingTemplate />}
            >
              <SafeAreaView
                style={{
                  flex: 1,
                }}
              >
                {children}
              </SafeAreaView>
            </NavigationContainer>
          </NativeBaseProvider>
        </GatguWebsocket.Provider>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppBootstrap;
