import { useCallback, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIos from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

import { asyncStoragekey } from '@/constants/asyncStorage';
import { PushNotificationType } from '@/enums';

import rootNavigation from '../rootNavigation';
import { parseNotifcationNavigationData } from '../utils/navigation';

const ANDROID_NOTIFICATION_CHANNEL = 'notification';

PushNotification.configure({
  // processing back/foreground notificaiton
  onNotification: function (notification) {
    const data = notification.data;

    const { stackName, navigateParams } = parseNotifcationNavigationData(
      data.path,
      data.payload
    );

    rootNavigation.navigate(stackName, navigateParams);

    notification.finish(PushNotificationIos.FetchResult.NoData);
  },

  onRegistrationError: function (err) {
    console.error('onRegistrationError:', err.message, err);
  },
});

const initChannel = () => {
  PushNotification.createChannel(
    {
      channelId: ANDROID_NOTIFICATION_CHANNEL,
      channelName: ANDROID_NOTIFICATION_CHANNEL,
      vibrate: true,
    },
    (created) => {
      console.debug('channel created:', created);
    }
  );
};

initChannel();

const usePushNotification = () => {
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
    try {
      const storedFcmToken = await AsyncStorage.getItem(
        asyncStoragekey.FCM_TOKEN
      );
      const fetchedFcmToken = await messaging().getToken();
      console.debug('fcm_Token:', fetchedFcmToken);

      if (storedFcmToken !== fetchedFcmToken) {
        AsyncStorage.setItem(asyncStoragekey.FCM_TOKEN, fetchedFcmToken);
      }
    } catch (err) {
      console.error('getFcmToken:', err);
    }
  };

  const _subscribeForegroundNotification = useCallback(() => {
    return messaging().onMessage(async (msg) => {
      if (!msg.notification) return;

      // foreground chatting notification must be fired in chattingRoom or chattingList component
      if (msg.data?.type === PushNotificationType.NEW_CHATTING) return;

      PushNotification.localNotification({
        channelId: ANDROID_NOTIFICATION_CHANNEL,
        title: msg.notification.title,
        message: msg.notification.body ?? '',
        userInfo: msg.data,
      });
    });
  }, []);

  const handlePermission = async () => {
    const authStatus = await messaging().hasPermission();
    let enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;

    if (!enabled) {
      enabled = await _requestUserPermission();
    }

    if (enabled) {
      await _getFcmToken();
    }
  };

  useEffect(() => {
    const unsubscribe = _subscribeForegroundNotification();
    messaging().setBackgroundMessageHandler(async (msg: any) => {
      return console.debug('background_message:', msg);
    });

    return unsubscribe;
  }, [_subscribeForegroundNotification]);

  return {
    handlePermission,
  };
};

export default usePushNotification;
