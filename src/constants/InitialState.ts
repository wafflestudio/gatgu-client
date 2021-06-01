import { IArticleProps, IParticipantsSummary } from '@/types/article';
import { IChattingRoom, IOrderChat } from '@/types/chat';

import { ArticleStatus, OrderStatus } from './Enum';

export const initialOrderChat: IOrderChat = {
  id: 0,
  participant_profile: [],
  article: 0,
  order_status: 0,
  tracking_number: 0,
};

export const initialParticipantsSummary: IParticipantsSummary = {
  count: 0,
  price: 0,
};

export const initialArticle: IArticleProps = {
  writer_id: 0,
  article_id: 0,
  title: '',
  description: '',
  trading_place: '',
  product_url: '',
  price_min: 0,
  time_in: new Date(),
  image: [], // 확실하지 않음... api에 타입이 안 적혀있음
  tag: [],
  created_at: new Date(), // should be date but json server doesn't accept Date
  updated_at: new Date(),
  article_status: ArticleStatus.UNDEFINED_STATUS,
  order_chat: initialOrderChat,
  participants_summary: initialParticipantsSummary,
};

export const initialChatInfo: IChattingRoom = {
  id: 0,
  participant_profile: [],
  article: 0,
  order_status: OrderStatus.UNDEFINED_STATUS,
  tracking_number: 0,
  // not in api
  uri: '',
  title: '',
  chat: '',
  time: 0,
  nickName: '',
};
