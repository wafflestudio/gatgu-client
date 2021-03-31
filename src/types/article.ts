import { IS_MONEY, IS_PEOPLE } from '@/constants/Enum';
import { SearchType } from '@/constants/article';

type TneedType = typeof IS_MONEY | typeof IS_PEOPLE;

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
  need_type: TneedType;
  price_min: number;
  people_min: number;
  time_in: string;
  written_at: string;
  article_id: string;
  participants_summary: IParticipantsSummary;
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
export interface IArticleProps {
  id?: string; // TODO: @juimdpp
  // todo: same as article_id but necessary here for JSON-server, so remove
  // when: when server is stable
  writer_id?: number;
  article_id?: number;
  title: string;
  description: string;
  location: string;
  product_url?: string;
  thumbnail_url?: string | null | undefined;
  image?: (string | null | undefined)[]; // 확실하지 않음... api에 타입이 안 적혀있음
  need_type?: number; // 1: people, 2: money
  price_min: number;
  people_min: number;
  tag?: number[];
  time_in: Date;
  created_at?: string; // should be date but json server doesn't accept Date
  updated_at?: string;
  participants_summary?: {
    count: number;
    price: number;
  };
}

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
