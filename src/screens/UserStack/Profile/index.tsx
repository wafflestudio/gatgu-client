import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { AppRoutes } from '@/helpers/routes';
import { RootState } from '@/store';

import LoggedProfile from './Logged';
import UnLoggedProfile from './UnLogged';

function Profile(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const isLogined = useSelector((state: RootState) => state.user.isLogined);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '더보기',
      headerTitleAlign: 'center',
      // eslint-disable-next-line react/display-name
      headerRight: () =>
        isLogined ? (
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigation.navigate(AppRoutes.Configs)}
          >
            <FeatherIcon
              name="more-vertical"
              style={{ fontSize: 20, marginRight: 10 }}
              onPress={() => setShow(!show)}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [isLogined, navigation, show]);

  return isLogined ? <LoggedProfile /> : <UnLoggedProfile />;
}

export default Profile;
