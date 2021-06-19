import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import LoggedProfile from './Logged';
import UnloggedProfile from './UnLogged';

function Profile(): JSX.Element {
  const isTokenExists = !!useSelector(
    (state: RootState) => state.user.accessToken
  );

  return isTokenExists ? <LoggedProfile /> : <UnloggedProfile />;
}

export default Profile;
