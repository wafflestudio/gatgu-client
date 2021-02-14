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
import { AppLoading } from '@/screens';
import { SafeAreaView } from 'react-native';

function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <BottomNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
