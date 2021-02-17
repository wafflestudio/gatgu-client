export interface IArticleSumProps {
  id: number;
  title: string;
  dayLeft: string;
  goal: string;
  location: string;
  percent: number;
  uri: string;
  created: string;
  isMoney: boolean;
}

export interface IPageLimitRes {
  pageLimit: {
    limit: number;
  };
}

export interface IArticleProps {
  title: string;
  people_count: number;
  price: number;
  location: string;
  description: string;
  product_url: string;
  // thumbnail_url: string[];
  temp_author_id: number; // made this temp because not included in actual endpoint
}

export interface ITagType {
  id: number;
  tag: string;
  selected: boolean;
}

export interface IGetFailPayload {
  errorStatus: number;
}

// Todo : combine interfaces after refactoring home screen feature

export interface IGetSuccessPayload {
  data: IArticleSumProps[];
}

export interface IGetSuccessPayloadV1 {
  data: IArticleSumProps[];
  next: string;
  pervieous: string;
}
