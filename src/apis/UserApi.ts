import axios, { AxiosResponse } from 'axios';

// import { IncomingWebhook } from '@slack/webhook';
import apiClient, { requester } from '@/apis/apiClient';
import { getTs } from '@/helpers/functions/time';
import { ILoginResponse, IUserDetail, IUserSimple } from '@/types/user';

// const webhook = new IncomingWebhook(
//   'https://hooks.slack.com/services/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'
// );

// 내 정보 받아오기
export const getMyData = (): Promise<AxiosResponse<IUserDetail>> => {
  return apiClient.get('users/me/');
};

export const modifyMyInfo = ({
  password,
  nickname,
  trading_address,
  picture,
}: {
  password?: string;
  nickname?: string;
  trading_address?: string;
  picture?: string;
}): Promise<AxiosResponse> => {
  return apiClient.patch('users/me/', {
    password: password || undefined,
    nickname,
    trading_address,
    picture,
  });
};

// 다른 유저 정보 받아오기
export const getOtherUserData = (
  userId: number
): Promise<AxiosResponse<IUserSimple>> => {
  return apiClient.get(`users/${userId}/`);
};

// 로그인
export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<ILoginResponse>> => {
  return apiClient.put(`users/login/`, {
    username,
    password,
  });
};

// 로그아웃
export const logout = (): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.put('users/logout/');
};

// 회원가입
export const signUp = (
  username: string,
  password: string,
  email: string,
  nickname: string,
  trading_address: string
): Promise<AxiosResponse<IUserDetail>> => {
  return apiClient.post(`users/`, {
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
  return apiClient.put('users/confirm/', {
    email,
  });
};

// 이메일 인증
export const confirmMailCode = (
  email: string,
  code: string
): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.put('users/activate/', {
    email,
    code,
  });
};

// access 토큰 재발행
export const refreshAccessToken = (
  refresh: string
): Promise<AxiosResponse<{ access: string; refresh: string }>> => {
  return requester.post('token/refresh/', {
    refresh,
  });
};

// fcn 토큰 등록
export const postFcmToken = (token: string): Promise<AxiosResponse> => {
  return apiClient.post('fcm/', { token });
};

// 알림 on off
export const changeNotificationStatus = (active: boolean) => {
  return apiClient.put('fcm/activate/', { active });
};

// 건의사항

export const sendProposal = async ({
  content,
  userId,
  email,
}: {
  content: string;
  userId: number;
  email: string;
}) => {
  const payload = {
    latest: getTs(),
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: '새로운 건의사항이 도착하였습니다.',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*내용*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: content,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*유저 정보*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `id : ${userId}\nemail : ${email} 
          `,
        },
      },
    ],
  };

  return await axios.post(
    'https://hooks.slack.com/services/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',
    payload
  );
};
