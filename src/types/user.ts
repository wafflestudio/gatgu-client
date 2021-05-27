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
  profile_id: number;
  picture: string;
  nickname: string;
  grade: 'grade (integer, choice)';
  point: number;
  updated_at: 'updated time (time)';
  withdrew_at: 'withdrew time (time)';
  trading_address: '(str)';
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
  grade: 'grade (integer, choice)';
  trading_address: '(str)';
}

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
  profile_id?: number | undefined;
  picture?: string | undefined;
  nickname?: string | undefined;
}

export interface IChatUserProps {
  id: number;
  joined_at: any; // should be time
  pay_status: boolean;
  wish_price: number;

  // TODO @ssu1018
  //  이거 타입 확인 부탁드립니당
  participant: IUserProfileDetail;
}
