import { useCallback, useEffect, useState } from 'react';
import PushNotification from 'react-native-push-notification';

import _ from 'lodash';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/core';

import { asyncStoragekey } from '@/constants/asyncStorage';
import { INotificationConfig } from '@/types/Notification';

import { ObjectStorage } from '../functions/asyncStorage';
import useEffectOnce from '../hooks/useEffectOnce';
import { NotificationContext } from './Context';

PushNotification.configure({
  onNotification: function (notification) {
    // process the notification

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.debug('ACTION:', notification.action);
    console.debug('NOTIFICATION:', notification);

    // process the action
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
});

const NotificationProvider: React.FC = ({ children }) => {
  const navigation = useNavigation();

  const [initialRoute, setInitialRoute] = useState('');
  const [loading, setLoading] = useState(true);
  const [
    notificationConfig,
    setNotificationConfig,
  ] = useState<INotificationConfig | null>(null);
  /**
   * ios prevents messages containing notification payloads from being displayed
   * without permision. This function provides native permission dialog for requesting
   * permission. On Android, this method is called but there's no effects.
   */
  const _requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  const _getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem(asyncStoragekey.FCM_TOKEN);
    if (fcmToken === null) {
      try {
        fcmToken = await messaging().getToken();

        if (fcmToken) {
          await AsyncStorage.setItem(asyncStoragekey.FCM_TOKEN, fcmToken);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return fcmToken;
  };

  const _getNotificationConfig = async () => {
    const _notificationConfig = await ObjectStorage.getObject<INotificationConfig>(
      asyncStoragekey.NOTIFICATION_CONFIG
    );

    if (!_notificationConfig) {
      const defaultConfig = {
        announcement: true,
        chat: true,
        event: true,
      };

      ObjectStorage.addObject<INotificationConfig>(
        asyncStoragekey.NOTIFICATION_CONFIG,
        defaultConfig
      );
      setNotificationConfig(defaultConfig);
    } else {
      setNotificationConfig(_notificationConfig);
    }
  };

  const _setRouting = () => {
    // background state
    firebase.messaging().onNotificationOpenedApp((msg) => {
      navigation.navigate(msg.data?.routeName ?? 'home');
    });

    // quit state
    firebase
      .messaging()
      .getInitialNotification()
      .then((msg) => {
        setInitialRoute(msg?.data?.routeName ?? 'home');
      });

    setLoading(false);
  };

  // processing foreground notification
  const _subscribeForegroundNotification = useCallback(() => {
    const channelId = _.uniqueId('foreground-notification');

    PushNotification.createChannel(
      {
        channelId,
        channelName: 'My channel',
        vibrate: true,
      },
      (err) => console.error(err)
    );

    return messaging().onMessage(async (msg) => {
      // fcm doesn't support foreground notification.
      // so, if foreground remotemessage has notification property, fire localNotification.
      if (!msg.notification) return;

      switch (true) {
        case notificationConfig?.announcement: {
          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: channelId,

            /* iOS and Android properties */
            message: msg?.data?.text ?? '',
          });
        }
      }
    });
  }, [notificationConfig]);

  // processing background, quit notification
  const _setBackgroundNotification = useCallback(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // processing msg
    });
  }, []);

  const handleNotificationConfig = useCallback(
    (config: Partial<INotificationConfig>) => {
      setNotificationConfig((prev) => {
        const newConfig = {
          ...prev,
          ...(config as INotificationConfig),
        };

        ObjectStorage.addObject<INotificationConfig>(
          asyncStoragekey.NOTIFICATION_CONFIG,
          newConfig
        );

        return newConfig;
      });
    },
    []
  );

  const handlePermission = async () => {
    const authStatus = await firebase.messaging().hasPermission();
    let enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;

    if (enabled) {
      _getFcmToken();
    } else {
      enabled = await _requestUserPermission();

      if (enabled) {
        await _getFcmToken();
      }
    }

    return enabled;
  };

  useEffectOnce(() => {
    handlePermission();
    _getNotificationConfig();
    _setRouting();
  });

  useEffect(() => {
    const unsubscribe = _subscribeForegroundNotification();
    _setBackgroundNotification();

    return unsubscribe;
  }, [
    notificationConfig,
    _subscribeForegroundNotification,
    _setBackgroundNotification,
  ]);

  return (
    <NotificationContext.Provider
      value={{
        loading,
        notificationConfig,
        initialRoute,
        handleNotificationConfig,
        handlePermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
