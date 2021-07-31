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

export type TNewChattingNotificaitonData = {
  type: PushNotificationType.NewChatting;
  payload: {
    params: {
      room_id: number;
    };
  };
};

export type TAnnouncementNotificationData = {
  type: PushNotificationType.Announcement;
  payload: null;
};

export type TKeywordNotificationData = {
  type: PushNotificationType.ArticleKeyword;
  payload: {
    params: {
      article_id: number;
    };
  };
};

export type TNotificationData = {
  link?: string;
} & (
  | TNewChattingNotificaitonData
  | TAnnouncementNotificationData
  | TKeywordNotificationData
);
