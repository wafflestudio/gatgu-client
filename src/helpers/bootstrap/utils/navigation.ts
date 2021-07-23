import { Linking } from 'react-native';

import { firebase } from '@react-native-firebase/messaging';
import { LinkingOptions } from '@react-navigation/native';

import { AppRoutes } from '@/helpers/routes';

export const parseNotifcationNavigationData = (
  path: string,
  payload?: string
) => {
  let stackName = '';
  let navigateParams = {};

  try {
    const splittedPath: string[] = path.split('/');
    stackName = splittedPath.shift() ?? '';

    navigateParams = splittedPath.reduce((x, p, idx) => {
      const params: any = {
        screen: p,
      };

      if (idx === splittedPath.length - 1 && payload) {
        params['params'] = JSON.parse(payload)?.params;
      }

      return {
        ...x,
        params,
      };
    }, {});
  } catch (err) {
    console.error(err);
  }

  return {
    stackName,
    navigateParams,
  };
};

// Deep links
const deepLinksConf: LinkingOptions['config'] = {
  screens: {
    [AppRoutes.MainStack]: {
      screens: {
        [AppRoutes.ArticleStack]: 'article/:id',
        [AppRoutes.ChattingList]: 'chatting',
      },
    },
    [AppRoutes.AuthStack]: {
      screens: {
        [AppRoutes.Login]: 'login',
      },
    },
    [AppRoutes.AuthStack]: {
      path: 'login',
    },
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
    const url = await Linking.getInitialURL();

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
