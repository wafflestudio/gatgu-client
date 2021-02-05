import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import BottomNavigation from '@/components/BottomNavigation';
import store from '@/store/rootStore';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
}
