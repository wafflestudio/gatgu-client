import { AxiosResponse } from 'axios';

import gatguAxios from '@/apis/gatguAxios';
import { ILoginResponse, IUserDetail, IUserSimple } from '@/types/user';

// 내 정보 받아오기
export const getMyData = (): Promise<AxiosResponse<IUserDetail>> => {
  return gatguAxios.get('user/me/');
};

// 다른 유저 정보 받아오기
export const getOtherUserData = (
  userId: number
): Promise<AxiosResponse<IUserSimple>> => {
  return gatguAxios.get(`user/${userId}/`);
};

// 로그인
export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<ILoginResponse>> => {
  return gatguAxios.put(`user/login/`, {
    username,
    password,
  });
};

// 로그아웃
export const logout = (): Promise<AxiosResponse<{ message: string }>> => {
  return gatguAxios.put('user/logout/');
};

// 회원가입
export const signUp = (
  username: string,
  password: string,
  email: string,
  nickname: string,
  trading_address: string
): Promise<AxiosResponse<IUserDetail>> => {
  return gatguAxios.post(`user/`, {
    username,
    password,
    email,
    nickname,
    trading_address,
  });
};

// 이메일 인증코드 신청
export const sendConfirmCodeMail = (
  email: string
): Promise<AxiosResponse<{ message: string }>> => {
  return gatguAxios.put('user/confirm/', {
    email,
  });
};

// 이메일 인증
export const confirmMailCode = (
  email: string,
  code: string
): Promise<AxiosResponse<{ message: string }>> => {
  return gatguAxios.put('user/activate/', {
    email,
    code,
  });
};

export const refreshAccessToken = (
  refresh: string
): Promise<AxiosResponse<{ access: string; refresh: string }>> => {
  return gatguAxios.post('token/refresh/', {
    refresh,
  });
};
