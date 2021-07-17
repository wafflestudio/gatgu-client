import { useEffect } from 'react';

import { DateTime } from 'luxon';

import PushNotificationIOS, {
  PushNotification,
} from '@react-native-community/push-notification-ios';

const useNotificationClick = () => {
  /**
   * By calling this function, notification with category `userAction` will have action buttons
   */
  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          { id: 'open', title: 'Open', options: { foreground: true } },
          {
            id: 'ignore',
            title: 'Desruptive',
            options: { foreground: true, destructive: true },
          },
          {
            id: 'text',
            title: 'Text Input',
            options: { foreground: true },
            textInput: { buttonTitle: 'Send' },
          },
        ],
      },
    ]);
  };

  const onRemoteNotification = (notification: PushNotification) => {
    const actionIdentifier = notification.getActionIdentifier();

    console.log(notification);
  };

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotificationIOS.addEventListener(
      'localNotification',
      onRemoteNotification
    );

    PushNotificationIOS.addNotificationRequest({
      id: 'hello',
      title: '같구의 첫 번째 알림',
      body: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      fireDate: DateTime.now().plus({ second: 3 }).toJSDate(),
    });
  });
};

export default useNotificationClick;
