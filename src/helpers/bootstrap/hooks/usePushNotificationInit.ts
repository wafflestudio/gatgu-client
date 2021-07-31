import { useCallback, useEffect, useState } from 'react';
import PushNotification from 'react-native-push-notification';

import PushNotificationIos from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Route } from '@react-navigation/native';

import { ANDROID_NOTIFICATION_CHANNEL } from '@/constants/notification';
import { PushNotificationType } from '@/enums';
import usePushNotification from '@/helpers/hooks/usePushNotification';
import { AppRoutes } from '@/helpers/routes';
import { TNotificationData } from '@/types/Notification';

import rootNavigation, { navigationRef } from '../rootNavigation';
import { parseNotifcationNavigationData } from '../utils/navigation';

PushNotification.configure({
  // processing back/foreground notificaiton
  onNotification: function (notification) {
    const data = notification.data;

    const { stackName, navigateParams } = parseNotifcationNavigationData(
      data.path,
      data.payload
    );

    console.log('fore/background notificaiton:', notification);

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

const usePushNotificationInit = () => {
  const [currentRoute, setCurrentRoute] = useState<Route<any>>();

  const { sendLocalNotification } = usePushNotification();

  const isMessageIgnored = useCallback(
    (data: TNotificationData) => {
      if (data.type === PushNotificationType.NewChatting) {
        if (currentRoute?.name === AppRoutes.ChattingList) return;
        if (
          currentRoute?.name === AppRoutes.ChattingRoom &&
          (currentRoute?.params as any)?.id === data.payload.params.room_id
        )
          return true;
      }

      return false;
    },
    [currentRoute]
  );

  const subscribeForegroundNotification = useCallback(() => {
    return messaging().onMessage(async (msg) => {
      if (!msg.notification) return;

      const msgData = {
        ...msg.data,
        payload: JSON.parse(msg.data?.payload ?? '{}'),
      } as TNotificationData;

      if (isMessageIgnored(msgData)) return;

      sendLocalNotification({
        title: msg.notification.title,
        message: msg.notification.body,
        userInfo: msg.data,
      });
    });
  }, [sendLocalNotification, isMessageIgnored]);

  useEffect(() => {
    const unsubscribeForegroundNotification = subscribeForegroundNotification();

    return () => {
      unsubscribeForegroundNotification();
    };
  }, [subscribeForegroundNotification]);

  useEffect(() => {
    const routeChangeCallback = () => {
      const route = navigationRef.current?.getCurrentRoute();
      setCurrentRoute(route);
    };

    navigationRef.current?.addListener('state', routeChangeCallback);

    return () => {
      navigationRef.current?.removeListener('state', routeChangeCallback);
    };
  }, []);
};

export default usePushNotificationInit;
