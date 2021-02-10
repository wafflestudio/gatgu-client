// tsx 사용시 사용자 정의 type 적는 곳.

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

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
  created_at: time;
  updated_at: time;
  is_active: boolean;
};
