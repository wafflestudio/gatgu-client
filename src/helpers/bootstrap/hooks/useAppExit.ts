// work only for android
import React from 'react';
import { Alert, BackHandler } from 'react-native';

import { navigationRef } from '../rootNavigation';

const useAppExit = () => {
  React.useEffect(() => {
    const backPressHandler = () => {
      if (!navigationRef.current?.canGoBack()) {
        Alert.alert('앱을 종료하시겠습니까?', '', [
          { text: '네', onPress: () => BackHandler.exitApp() },
          { text: '아니요', onPress: () => false },
        ]);
        return true;
      }
    };
    BackHandler.addEventListener('hardwareBackPress', backPressHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    };
  }, []);
};

export default useAppExit;
