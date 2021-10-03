import { SearchType } from '@/constants/article';
import * as Enums from '@/enums';

import { IOrderChat } from './chat';
import { ICursorPaginationResponse } from './shared';
import { IUserSumProps } from './user';

export interface IArticleImage {
  id: number;
  img_url: string;
}

export interface IArticleStatus {
  progress_status: Enums.ArticleStatus;
  cur_price_sum: number;
}

// response type
export interface IArticleSummary {
  writer_id: number;
  article_id: number;
  title: string;
  trading_place: string;
  images: IArticleImage[];
  price_min: number;
  tag: number;
  time_in: number;
  article_status: IArticleStatus;
  updated_at: number;
}

export type IGetArticlesResponse = ICursorPaginationResponse<IArticleSummary>;

export type TSearchType = SearchType.TITLE | SearchType.TAG;

export interface IReqPresignedURL {
  method: string;
  file_name: string;
}

export interface IArticleProps {
  writer: IUserSumProps;
  article_id: number;
  title: string;
  description: string;
  trading_place: string;
  product_url: string;
  price_min: number;
  time_in: number;
  images: IArticleImage[]; // 확실하지 않음... api에 타입이 안 적혀있음
  // tag?: number[];
  created_at: number; // should be date but json server doesn't accept Date
  updated_at: number;
  article_status: IArticleStatus;
  order_chat: IOrderChat;
}

// Used for sending POST request for articlse
export type IPostArticle = Pick<
  Required<IArticleProps>,
  | 'title'
  | 'description'
  | 'trading_place'
  | 'product_url'
  | 'price_min'
  | 'time_in'
> & { img_urls: IArticleImage[] };
/** when posting, must send with 'img_urls'
 *  when receiving (get), must get with 'images'
 *  Pick<Partial<IArticleProps>, 'img_urls' | 'tag'>;
 */

export interface ITagType {
  id: number;
  tag: string;
  selected: boolean;
}

export interface IGetFailPayload {
  error: any;
}
