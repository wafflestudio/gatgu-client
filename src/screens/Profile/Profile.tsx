import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/rootState';

import LoggedProfile from './Logged/Logged';
import UnloggedProfile from './UnLogged/UnLogged';

function Profile(): JSX.Element {
  const logged = useSelector((state: RootState) => state.user.logged);

  return logged ? <LoggedProfile /> : <UnloggedProfile />;
}

export default Profile;
