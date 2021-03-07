// TODO: @ssu1018
//   remove this
export interface IArticleSumProps {
  id: number;
  title: string;
  dayLeft: string;
  location: string;
  goal: string;
  percent: number;
  uri: string;
  created: string;
  isMoney: boolean;
}

export interface IArticleSumProps {
  id: number;
  title: string;
  dayLeft: string;
  location: string;
  thumbnail_url: string;
  price_min: string;
  people_count_min: string;

  // 다음 field model에는 없지만 추가적으로 필요합니다!
  dueDate: string;
  isMoney: boolean;
}

export interface IArticleSumSearchProps extends IArticleSumProps {
  transactionStatus: string;
}

interface IPagination {
  count: number;
  next: string;
  previous: string;
}

export interface IArticleSumResponse extends IPagination {
  results: IArticleSumProps[];
}

export interface IArticleSumSearchResponse extends IPagination {
  results: IArticleSumSearchProps[];
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

export interface IGetSuccessPayload {
  data: IArticleSumProps[];
  next: string;
  previous: string;
}

export interface IMessageRet {
  message: string;
}
