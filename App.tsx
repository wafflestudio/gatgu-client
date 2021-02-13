import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {
  useFonts,
  NotoSansKR_500Medium,
  NotoSansKR_400Regular,
  NotoSansKR_700Bold
} from '@expo-google-fonts/noto-sans-kr';
import BottomNavigation from '@/components/BottomNavigation';
import store from '@/store/rootStore';
import { Loading } from '@/screens';

export default function App() {
  let [fontsLoaded] = useFonts({ NotoSansKR_500Medium, NotoSansKR_400Regular, NotoSansKR_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
}
