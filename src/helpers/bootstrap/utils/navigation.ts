import { Linking, Platform } from 'react-native';
import NativeIntentAndroid from 'react-native/Libraries/Linking/NativeIntentAndroid';

import { firebase } from '@react-native-firebase/messaging';
import { LinkingOptions } from '@react-navigation/native';

const NativeLinking = Platform.OS === 'android' ? NativeIntentAndroid : Linking;

// Deep links
const deepLinksConf: LinkingOptions['config'] = {
  screens: {
    MainStack: {
      screens: {
        Home: {
          screens: {
            ArticleStack: { screens: { Article: 'article/:id' } },
          },
        },
      },
    },
    SubStack: {
      screens: {
        UserProfile: 'user-profile',
      },
    },
    ChattingRoom: 'chatting-room/:id',
  },
};

export const linking: LinkingOptions = {
  prefixes: ['gatgu://', 'https://app.gatgu.site'],
  config: deepLinksConf,
  async getInitialURL() {
    // Check if app was opened from a deep link
    /**
     * 😂😂😂  this is not working in expo-ejected app.
     * bare react-native로 이전해야 합니다. ㅠ
     */
    const url = await NativeLinking.getInitialURL();
    if (url != null) return url;

    const message = await firebase.messaging().getInitialNotification();
    return message?.data?.link;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    const unsubscribeNotification = firebase
      .messaging()
      .onNotificationOpenedApp((message) => {
        const url = message?.data?.link;
        console.debug('on NotificationOpendApp url:', url);

        if (!message.data) {
          return;
        }

        if (url) {
          listener(url);
        }
      });

    return () => {
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};
