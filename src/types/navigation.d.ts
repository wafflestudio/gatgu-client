// tsx 사용시 사용자 정의 type 적는 곳.

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type TagType = {
  id: number;
  tag: string;
  selected: boolean;
};

export type ArticleType = {
  title: string;
  people_count: number;
  price: number;
  location: string;
  description: string;
  product_url: string;
  // thumbnail_url: string[];
  temp_author_id: number; // made this temp because not included in actual endpoint
};
