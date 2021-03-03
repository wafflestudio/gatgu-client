interface IPagination {
  next: string;
  previous: string;
}

// article summary props
export interface IArticleSumProps {
  title: string;
  location: string;
  thumbnail_url: string;
  need_type: string;
  price_min: string;
  people_min: string;
  time_in: string;
  created_at: string;
  article_id: string;
}

interface IArticleDetail extends IArticleSumProps {
  writer_id: number;
  description: string;
  product_url: string;
  image: string;
  tag: string[];
  updated_at: string;
}

export interface IArticleSumRes extends IPagination {
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

export interface IGetFailPayload {
  errorStatus: number;
}

export interface IGetSuccessPayload extends IPagination {
  data: IArticleSumProps[];
}

export interface IMessageRet {
  message: string;
}
