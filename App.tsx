import React, { useRef } from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';
import {
  useFonts,
  NotoSansKR_500Medium,
  NotoSansKR_400Regular,
  NotoSansKR_700Bold,
} from '@expo-google-fonts/noto-sans-kr';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';

import BottomNavigation from '@/components/BottomNavigation';
import routes from '@/helpers/routes';
import { AppLoading } from '@/screens';
import { SignUpStackScreen } from '@/screens/StackScreens';
import store from '@/store/rootStore';

const { ChattingRoom, Login, SignUp } = routes;

const Stack = createStackNavigator();

function App(): JSX.Element {
  const navigationRef: React.MutableRefObject<null | NavigationContainerRef> = useRef(
    null
  );

  const [fontsLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ChattingRoom.name}
              component={ChattingRoom.component}
              //TODO: @ssu1018
              // - 더보기 아이콘 넣기
              options={{
                // eslint-disable-next-line react/display-name
                headerRight: () => (
                  <TouchableHighlight
                    onPress={() => {
                      navigationRef?.current?.dispatch(
                        DrawerActions.toggleDrawer()
                      );
                    }}
                  >
                    <Text>더보기</Text>
                  </TouchableHighlight>
                ),
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
  );
}

export default App;
