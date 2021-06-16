import { ArticleStatus } from '@/constants/Enum';
import { SearchType } from '@/constants/article';
import * as Enums from '@/enums';

import { IOrderChat } from './chat';
import { ICursorPaginationResponse } from './shared';

export interface IParticipantsSummary {
  count: number;
  price: number;
}

// response type
export interface IGetArticleResponse {
  writer_id: number;
  article_id: number;
  title: string;
  trading_place: string;
  image: string | null;
  price_min: number;
  tag: number;
  time_in: string;
  article_status: {
    count: number;
    price: number;
    progress_status: Enums.ArticleStatus;
  };
  updated_at: string;
}

export type IGetArticlesResponse = ICursorPaginationResponse<IGetArticleResponse>;

export type TSearchType = SearchType.TITLE | SearchType.TAG;

export interface IArticleProps {
  writer_id: number;
  article_id: number;
  title: string;
  description: string;
  trading_place: string;
  product_url: string;
  price_min: number;
  time_in: Date;
  image: (string | null | undefined)[]; // 확실하지 않음... api에 타입이 안 적혀있음
  tag: number[];
  created_at: Date; // should be date but json server doesn't accept Date
  updated_at: Date;
  article_status: ArticleStatus;
  order_chat: IOrderChat;
  participants_summary: IParticipantsSummary;
}

export type IArticleSummary = Omit<IGetArticleResponse, 'updated_at' | 'tag'>;

// Used for sending POST request for articlse
export type IPostArticle = Pick<
  Required<IArticleProps>,
  | 'title'
  | 'description'
  | 'trading_place'
  | 'product_url'
  | 'price_min'
  | 'time_in'
> &
  Pick<Partial<IArticleProps>, 'image' | 'tag'>;

export interface ITagType {
  id: number;
  tag: string;
  selected: boolean;
}

export interface IGetFailPayload {
  errorStatus: number;
}
