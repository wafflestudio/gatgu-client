import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import LoggedProfile from './Logged';
import UnloggedProfile from './UnLogged';

function Profile(): JSX.Element {
  const logged = useSelector((state: RootState) => state.user.logged);

  return logged ? <LoggedProfile /> : <UnloggedProfile />;
}

export default Profile;
