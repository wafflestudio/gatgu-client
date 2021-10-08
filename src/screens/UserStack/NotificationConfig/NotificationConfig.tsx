import React from 'react';

import { Flex, Switch } from 'native-base';

import { userAPI } from '@/apis';
import { palette } from '@/styles';

import { ConfigLayout, IConfigLayoutItem } from '../components/ConfigLayout';

const NotificationConfig: React.FC = () => {
  const [isChatNotiOn, setChatNotiOn] = React.useState(false);

  const handleChattingNoti = async () => {
    const nextNotiStatus = !isChatNotiOn;
    try {
      await userAPI.changeNotificationStatus(nextNotiStatus);
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
