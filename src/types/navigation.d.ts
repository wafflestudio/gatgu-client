// tsx 사용시 사용자 정의 type 적는 곳.

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

// 이게 전체 유저 데이터이긴 한데, 각 경우에서 들어오는 정보가 모두 다르기 때문에 각각 어쩔지 토의해야 함
// 백엔드에서 항상 일관된 정보를 주시든가
// 우리가 항상 일관된 정보만 User redux에 담든가
export type UserType = {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  userprofile: {
    profile_id: number;
    picture: string;
    nickname: string;
    address: string;
    phonenumber: string;
  };
  created_at: any;
  updated_at: any;
  is_active: boolean;
  token: string;
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
