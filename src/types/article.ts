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

export interface IArticleSumSearchProps {
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
  transactionStatus: string;
}

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
  price_min: number;
  people_count_min: number;
  created_at: string; // should be date but json server doesn't accept Date
  updated_at: string;
  deleted_at: string;
  notInAPI: {
    dueDate: string; // something that I thought was necessary
    goal: string;
    percent: number;
    isMoney: boolean;
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

// TODO:
// combine interfaces after refactoring home screen feature

export interface IGetSuccessPayload {
  data: IArticleSumProps[];
}

export interface IGetSuccessPayloadV1 {
  data: IArticleSumProps[];
  next: string;
  pervieous: string;
}
