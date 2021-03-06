import { IS_MONEY, IS_PEOPLE } from '@/constants/Enum';

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
  created_at: string;
  article_id: string;
  participnats_summary: IParticipantsSummary;
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

//article detail
export interface IArticleProps {
  id: string;
  writer: {
    profile_id: number;
    picture: string;
    nickname: string;
    address: string;
    phonenumber: string;
  };
  title: string;
  description: string;
  location: string;
  product_url: string;
  thumbnail_url: string;
  image_url?: string[];
  need_type: number; // 1: people, 2: money
  price_min: number;
  people_count_min: number;
  time_max: string;
  created_at: string; // should be date but json server doesn't accept Date
  updated_at: string;
  deleted_at: string;
  current: number;
}

export interface ITagType {
  id: number;
  tag: string;
  selected: boolean;
}

export interface IGetArticleSumFailPayload {
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
