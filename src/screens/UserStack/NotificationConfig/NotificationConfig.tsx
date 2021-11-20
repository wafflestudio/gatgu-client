import React from 'react';

import { Flex, Switch } from 'native-base';

import { userAPI } from '@/apis';
import usePushNotification from '@/helpers/hooks/usePushNotification';
import { palette } from '@/styles';

import { ConfigLayout, IConfigLayoutItem } from '../components/ConfigLayout';

const NotificationConfig: React.FC = () => {
  const [isChatNotiOn, setChatNotiOn] = React.useState(false);

  const { getFcmToken } = usePushNotification();

  const handleChattingNoti = async () => {
    const nextNotiStatus = !isChatNotiOn;
    try {
      const fcmToken = await getFcmToken();
      await userAPI.changeNotificationStatus({
        active: nextNotiStatus,
        token: fcmToken,
      });
      setChatNotiOn(nextNotiStatus);
    } catch (err) {
      console.error(err.response);
    }
  };

  const chattingItems: IConfigLayoutItem[] = [
    {
      label: '채팅 알림',
      rightItem: (
        <Switch
          isChecked={isChatNotiOn}
          onTrackColor={palette.yellow}
          onThumbColor={palette.blue}
          onChange={handleChattingNoti}
        />
      ),
    },
  ];

  return (
    <Flex flex={1} backgroundColor={palette.white}>
      <ConfigLayout title="채팅" items={chattingItems} />
    </Flex>
  );
};

export default NotificationConfig;
