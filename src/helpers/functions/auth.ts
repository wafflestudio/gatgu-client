import get from 'lodash/get';
import { DateTime } from 'luxon';

import { refreshAccessToken } from '@/apis/UserApi';
import { setRequesterToken } from '@/apis/apiClient';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { asyncStorage, ObjectStorage } from '@/helpers/functions/asyncStorage';
import store from '@/store/rootStore';
import { setLoginState } from '@/store/userSlice';
import { DataWithExpiry } from '@/types/asyncStorage';

const getStoredAccessToken = async () => {
  const data = await ObjectStorage.getObject<DataWithExpiry>(
    asyncStoragekey.ACCESS_TOKEN
  );

  if (asyncStorage.checkDataNotExpired(data)) {
    return data?.data;
  } else {
    return null;
  }
};

const getStoredRefreshToken = async () => {
  const data = await ObjectStorage.getObject<DataWithExpiry>(
    asyncStoragekey.REFRESH_TOKEN
  );

  if (asyncStorage.checkDataNotExpired(data)) {
    return data?.data;
  } else {
    return null;
  }
};

export const updateAccessToken = async () => {
  const storedRefreshToken = await getStoredRefreshToken();
  if (!storedRefreshToken) return;

  const newTokenResponse = await refreshAccessToken(storedRefreshToken);
  const accessToken = get(newTokenResponse, ['data', 'access']);
  const refreshToken = get(newTokenResponse, ['data', 'refresh']);

  ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
    data: accessToken,
    expiry: DateTime.now().plus({ days: 1 }).toMillis(),
  });
  ObjectStorage.addObject(asyncStoragekey.REFRESH_TOKEN, {
    data: refreshToken,
    expiry: DateTime.now().plus({ days: 30 }).toMillis(),
  });

  return accessToken;
};

export const loginWithAccessToken = async () => {
  let accessToken = await getStoredAccessToken();

  if (accessToken) {
    updateAccessToken();
  } else {
    accessToken = await updateAccessToken();
  }

  if (accessToken) {
    setRequesterToken(accessToken);
    store.dispatch(setLoginState(true));
  }
};
