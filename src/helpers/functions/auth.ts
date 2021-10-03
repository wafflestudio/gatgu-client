import get from 'lodash/get';
import { DateTime } from 'luxon';

import { refreshAccessToken } from '@/apis/UserApi';
import { setRequesterToken } from '@/apis/apiClient';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { getTs } from '@/helpers/functions/time';
import store from '@/store/rootStore';
import { setLoginState } from '@/store/userSlice';
import { DataWithExpiry } from '@/types/asyncStorage';

export const updateAccessToken = async () => {
  const refreshTokenWithExpiry = await ObjectStorage.getObject<DataWithExpiry>(
    asyncStoragekey.REFRESH_TOKEN
  );

  if (!refreshTokenWithExpiry) return;
  if (refreshTokenWithExpiry.expiry < getTs()) {
    ObjectStorage.removeObject(asyncStoragekey.REFRESH_TOKEN);
    return;
  }

  const newTokenResponse = await refreshAccessToken(
    refreshTokenWithExpiry.data
  );

  const accessToken = get(newTokenResponse, ['data', 'access']);
  const refreshToken = get(newTokenResponse, ['dara', 'refresh']);

  ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
    data: accessToken,
    expiry: DateTime.now().plus({ day: 1 }).toMillis(),
  });
  ObjectStorage.addObject(asyncStoragekey.REFRESH_TOKEN, {
    data: refreshToken,
    expiry: DateTime.now().plus({ day: 30 }).toMillis(),
  });

  return accessToken;
};

export const loginWithAccessToken = async () => {
  const accessTokenWithExpiry = await ObjectStorage.getObject<DataWithExpiry>(
    asyncStoragekey.ACCESS_TOKEN
  );

  if (
    accessTokenWithExpiry &&
    accessTokenWithExpiry.expiry > DateTime.now().toMillis()
  ) {
    setRequesterToken(accessTokenWithExpiry.data);
    store.dispatch(setLoginState(true));
    console.debug('login with accesstoken');
    return await updateAccessToken();
  }

  const accessToken = await updateAccessToken();
  if (!accessToken) {
    console.debug('fail to update Token');
    throw new Error('fail to update Token');
  }
  console.debug('get new AccessToken');

  setRequesterToken(accessToken);
  store.dispatch(setLoginState(true));
  return accessToken;
};
