import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, TouchableHighlight, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { removeRequesterToken } from '@/apis/BaseInstance';
import { logout } from '@/apis/UserApi';
import { Button } from '@/components';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { RootState } from '@/store';
import { clearAccessToken } from '@/store/userSlice';
import { typo } from '@/styles';

import LoggedProfile from './Logged';
import styles from './Profile.style';
import UnLoggedProfile from './UnLogged';

function Profile(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const isTokenExists = useSelector(
    (state: RootState) => !!state.user.accessToken
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutReq = useCallback(async () => {
    await logout();
    dispatch(clearAccessToken());
    removeRequesterToken();

    ObjectStorage.removeObject(asyncStoragekey.ACCESS_TOKEN);
    ObjectStorage.removeObject(asyncStoragekey.REFRESH_TOKEN);
    Alert.alert('로그아웃 되었습니다.');
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '더보기',
      headerTitleAlign: 'center',
      // eslint-disable-next-line react/display-name
      headerRight: () =>
        isTokenExists ? (
          <View style={{ position: 'relative' }}>
            <FeatherIcon
              name="more-vertical"
              style={{ fontSize: 20, marginRight: 10 }}
              onPress={() => setShow(!show)}
            />
            {show ? (
              <View style={styles.headerRightModal}>
                <Button
                  title="수정하기"
                  textStyle={{
                    ...typo.bigTitle,
                  }}
                  onPress={() => {
                    setShow(false);
                    navigation.navigate('ProfileModify');
                  }}
                />
                <Button
                  title="로그아웃하기"
                  textStyle={{
                    ...typo.bigTitle,
                  }}
                  onPress={logoutReq}
                />
              </View>
            ) : null}
          </View>
        ) : null,
    });
  }, [isTokenExists, logoutReq, navigation, show]);

  return isTokenExists ? <LoggedProfile /> : <UnLoggedProfile />;
}

export default Profile;
