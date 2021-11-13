import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';

import messaging from '@react-native-firebase/messaging';

import { ANDROID_NOTIFICATION_CHANNEL } from '@/constants/notification';

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

  const getFcmToken = async () => {
    try {
      const fetchedFcmToken = await messaging().getToken();
      console.debug('fcm_Token:', fetchedFcmToken);

      return fetchedFcmToken;
    } catch (err) {
      console.error('getFcmToken:', err);
    }
  };

  const handlePermission = async () => {
    const authStatus = await messaging().hasPermission();
    let enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;

    if (!enabled) {
      enabled = await _requestUserPermission();
    }

    if (enabled) {
      await getFcmToken();
    }
  };

  const sendLocalNotification = (
    notification: Omit<PushNotificationObject, 'message' | 'channelId'> &
      Partial<Pick<PushNotificationObject, 'message'>>
  ) => {
    PushNotification.localNotification({
      ...notification,
      channelId: ANDROID_NOTIFICATION_CHANNEL,
      message: notification.message ?? '',
      largeIcon: 'ic_launcher_foreground',
      bigLargeIcon: 'ic_launcher_foreground',
    } as PushNotificationObject);
  };

  return {
    getFcmToken,
    handlePermission,
    sendLocalNotification,
  };
};

export default usePushNotification;
