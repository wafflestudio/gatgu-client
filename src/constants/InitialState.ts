import { IArticleProps } from '@/types/article';
import { IChattingRoom } from '@/types/chat';

import { Need, Status } from './Enum';

export const initialArticle = {
  article_id: 0,
  writer_id: 0,
  title: '',
  description: '',
  location: '',
  product_url: '',
  image: [],
  thumbnail_url: '',
  need_type: Need.UNDEFINED_TYPE,
  price_min: 0,
  people_min: 0,
  time_in: '2021-02-28',
} as IArticleProps;

export const initialChatInfo = {
  id: 0,
  participant_profile: [],
  article: 0,
  order_status: Status.UNDEFINED_STATUS,
  trackingNumber: '',
  uri: '',
  title: '',
  chat: '',
  time: 0,
  nickName: '',
} as IChattingRoom;
