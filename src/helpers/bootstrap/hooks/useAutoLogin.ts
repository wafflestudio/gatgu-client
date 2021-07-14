import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import get from 'lodash/get';
import { DateTime } from 'luxon';

import { setRequesterToken } from '@/apis/BaseInstance';
import { refreshAccessToken } from '@/apis/UserApi';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import store from '@/store/rootStore';
import { setAccessToken } from '@/store/userSlice';
import { DataWithExpiry } from '@/types/asyncStorage';

const useAutoLogin = () => {
  const [loading, setLoading] = useState(true);

  const updateAccessToken = async () => {
    const refreshTokenWithExpiry = await ObjectStorage.getObject<DataWithExpiry>(
      asyncStoragekey.REFRESH_TOKEN
    );

    if (!refreshTokenWithExpiry) return;

    if (refreshTokenWithExpiry.expiry < Date.now()) {
      ObjectStorage.removeObject(asyncStoragekey.REFRESH_TOKEN);
      return;
    }

    const newTokenResponse = await refreshAccessToken(
      refreshTokenWithExpiry.data
    );
    const accessToken = get(newTokenResponse, ['data', 'access']);

    ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
      data: accessToken,
      expiry: DateTime.now().plus({ day: 1 }).toSeconds(),
    });

    return accessToken;
  };

  const loginWithToken = async () => {
    try {
      const accessTokenWithExpiry = await ObjectStorage.getObject<DataWithExpiry>(
        asyncStoragekey.ACCESS_TOKEN
      );

      if (
        accessTokenWithExpiry &&
        accessTokenWithExpiry.expiry > DateTime.now().toSeconds()
      ) {
        setRequesterToken(accessTokenWithExpiry.data);
        store.dispatch(setAccessToken(accessTokenWithExpiry.data));
        updateAccessToken();
      } else {
        const accessToken = await updateAccessToken();
        if (!accessToken) return;

        setRequesterToken(accessToken);
        store.dispatch(setAccessToken(accessToken));
      }
    } catch (err) {
      switch (err.response.data.error_code) {
        case 101: // refresh token 만료
          Alert.alert(err.response.data.detail);
          break;
        default:
          // cannot reach here: 아마 서버 에러
          break;
      }
    }
  };

  useEffect(() => {
    loginWithToken().finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return { authLoading: loading };
};

export default useAutoLogin;
