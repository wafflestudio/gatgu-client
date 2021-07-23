import { PushNotificationType } from '@/enums';

/**
 * - announcement
 * - chat
 * - event
 */
export interface INotificationConfig {
  /** get announcement of app posiible */
  announcement: boolean;
  /** get new chat notification posiible */
  chat: boolean;
  /** get event notification possilbe */
  event: boolean;
}

export interface INotificationMessage {
  data: {
    link?: string;
    type?: PushNotificationType;
    storedData?: any;
  };
}
