import { StringIterator } from 'lodash';

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
  dueDate: Date; // something that I thought was necessary
}

export interface ITagType {
  id: number;
  tag: string;
  selected: boolean;
}
