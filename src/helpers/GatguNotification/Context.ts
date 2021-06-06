import { createContext, useContext } from 'react';

import { INotificationConfig } from '@/types/Notification';

export interface INotificationContextValue {
  loading: boolean;
  notificationConfig: INotificationConfig | null;
  initialRoute: string;
  handleNotificationConfig: (config: Partial<INotificationConfig>) => void;
  handlePermission: () => void;
}

export const NotificationContext = createContext(
  {} as INotificationContextValue
);

export const useNotification = () => useContext(NotificationContext);
