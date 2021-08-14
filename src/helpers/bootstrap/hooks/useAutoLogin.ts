import { useEffect, useState } from 'react';

import { ErrorCode } from '@/enums/errorCode';
import { loginWithAccessToken } from '@/helpers/functions/auth';
import { useToaster } from '@/helpers/hooks';

const useAutoLogin = () => {
  const toaster = useToaster();

  const [loading, setLoading] = useState(true);

  const autoLogin = async () => {
    try {
      return await loginWithAccessToken();
    } catch (err) {
      if (err?.response?.data?.error_code === ErrorCode.UnAuthorized) {
        toaster.info(
          '오랫동안 접속하지 않아 로그아웃되었습니다.\n다시 로그인해주세요'
        );
      }
    }
  };

  useEffect(() => {
    autoLogin().finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return { authLoading: loading };
};

export default useAutoLogin;
