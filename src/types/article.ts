import { Need, ArticleStatus } from '@/constants/Enum';
import { SearchType } from '@/constants/article';

import { IChattingRoom, IOrderChat } from './chat';

interface IPagination {
  next: string;
  previous: string;
}

export interface IParticipantsSummary {
  count: number;
  price: number;
}

// article summary props
export interface IArticleSumProps {
  id: number;
  title: string;
  location: string;
  thumbnail_url: string;
  need_type: Need;
  price_min: number;
  people_min: number;
  time_in: string;
  written_at: string;
  article_id: string;
  participants_summary: IParticipantsSummary | undefined;
}

interface IArticleDetail extends IArticleSumProps {
  writer_id: number;
  description: string;
  product_url: string;
  image: string;
  tag: string[];
  updated_at: string;
}

export interface IArticleSumResponse extends IPagination {
  results: IArticleDetail[];
}

export interface IArticleSliceBasis {
  hasError: boolean;
  errorStatus: number;
  data: IArticleSumProps[];
  isLoading: boolean;
  next: string | null;
  previous: string | null;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export type TSearchType = SearchType.TITLE | SearchType.TAG;

//article detail
// export interface IArticleProps { // used for response from server
//   writer_id: number;
//   article_id: number;
//   title: string;
//   description: string;
//   trading_place: string;
//   product_url: string;
//   image: (string | null | undefined)[]; // 확실하지 않음... api에 타입이 안 적혀있음 @TODO: juimddp / when: when I get answer
//   price_min: number;
//   tag: number[];
//   time_in: Date;
//   created_at: Date;
//   updated_at: Date;
//   article_status: Article_Status;
//   order_chat: IChattingRoom; // @ASAP: must change
// }

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

// Used for sending POST request for article
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

export type TLoad = 'first' | 'next' | 'previous';

export interface IGetArticleSumSuccessPayload extends IPagination {
  data: IArticleSumProps[];
  type: TLoad;
}

export interface IMessageRet {
  message: string;
}

/*
  writer: {
    profile_id: number;
    picture: string;
    nickname: string;
    address: string;
    phonenumber: string;
  };

*/
