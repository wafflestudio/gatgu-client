// 내 정보
export interface IUserDetail {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  userprofile: IUserProfileDetail;
  date_joined: string;
  is_active: boolean;
  token: string;
  participated_count: number;
  hosted_count: number;
}

export interface IUserProfileDetail {
  user_id: number;
  picture: string;
  nickname: string;
  point: number;
  updated_at: number; // TODO 확인필요: string 일 수도
  withdrew_at: number;
  trading_address: string;
}

// 다른 사람 정보
export interface IUserSimple {
  userprofile: IUserProfileSimple;
  participated_count: number;
  hosted_count: number;
}

export interface IUserProfileSimple {
  profile_id: number;
  picture: string;
  nickname: string;
  trading_address: string;
}

export type IUserListPreview = Omit<IUserProfileDetail, 'user_id'> & {
  grade: number;
  id: number;
};

// TODO: this type is deprecated
export interface IUserProps {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: any;
  last_login: any;
  userprofile: IUserProfileDetail;
  is_active: boolean;
  participated_count: number;
  hosted_count: number;
  token: string;
}

export interface IUserSumProps {
  profile_id?: number;
  picture?: string;
  nickname?: string;
}

export interface IChatUserProps {
  id: number;
  joined_at: any; // should be time
  pay_status: number;
  wish_price: number;

  // TODO: @ssu1018
  //  타입 나오면 Detail 인지 Simple 인지 정하기
  participant: IUserProfileDetail;
}

export interface ILoginResponse {
  token: {
    refresh: string;
    access: string;
  };
}
