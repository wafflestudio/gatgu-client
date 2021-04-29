// 이게 전체 유저 데이터이긴 한데, 각 경우에서 들어오는 정보가 모두 다르기 때문에 각각 어쩔지 토의해야 함
// 백엔드에서 항상 일관된 정보를 주시든가
import { InteractionManagerStatic } from 'react-native';

// 우리가 항상 일관된 정보만 User redux에 담든가
export interface IUserProps {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: any;
  last_login: any;
  userprofile: IUserProfile;
  is_active: boolean;
  participated_count: number;
  hosted_count: number;
  token: string;
}

export interface IUserProfile {
  profile_id: number;
  picture: string;
  nickname: string;
  updated_at: any;
  withdrew_at: any;
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
  participant: IUserProfile;
}
