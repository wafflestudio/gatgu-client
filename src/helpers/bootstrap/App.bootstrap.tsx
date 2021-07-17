import React, { useRef } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { NativeBaseProvider } from 'native-base';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

import AppLoadingTemplate from '@/components/AppLoading';
import GatguWebsocket from '@/helpers/GatguWebsocket/GatguWebsocket';
import store from '@/store/rootStore';

import { NotificationProvider } from '../GatguNotification';
import { useAutoLogin } from './hooks';
import useNotificationClick from './hooks/useNotificationClick';

const queryClient = new QueryClient();

const AppBootstrap: React.FC = ({ children }) => {
  const { authLoading } = useAutoLogin();
  useNotificationClick();
  const navigationContainerRef = useRef<NavigationContainerRef>(null);

  const appLoading = [authLoading].some(Boolean);

  if (appLoading) {
    return <AppLoadingTemplate />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NotificationProvider
          navigation={navigationContainerRef.current as NavigationContainerRef}
        >
          <GatguWebsocket.Provider>
            <NativeBaseProvider>
              <NavigationContainer ref={navigationContainerRef}>
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
        </NotificationProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppBootstrap;
