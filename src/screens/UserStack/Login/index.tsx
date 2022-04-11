import React, { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex, VStack } from 'native-base';

import { StackActions, useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { setRequesterToken } from '@/apis/apiClient';
import Logo from '@/assets/icons/Logo';
import { GButton } from '@/components/Gatgu/GButton';
import { GSpace } from '@/components/Gatgu/GSpace';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { useToaster } from '@/helpers/hooks';
import usePushNotification from '@/helpers/hooks/usePushNotification';
import { setLoginState } from '@/store/userSlice';

import styles from './Login.style';

function Login(): JSX.Element {
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const toaster = useToaster();
  const dispatch = useDispatch();

  const { getFcmToken } = usePushNotification();

  const loginReq = useCallback(async () => {
    setLoading(true);

    try {
      const loginResponse = await userAPI.login(id, pw);

      getFcmToken()
        .then((res) => {
          if (res) {
            userAPI.postFcmToken(res);
          }
        })
        .catch(console.error);

      const { access, refresh } = loginResponse.data.token;

      setRequesterToken(access);
      dispatch(setLoginState(true));

      ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
        data: access,
        expiry: DateTime.now().plus({ days: 1 }).toMillis(),
      });
      ObjectStorage.addObject(asyncStoragekey.REFRESH_TOKEN, {
        data: refresh,
        expiry: DateTime.now().plus({ days: 30 }).toMillis(),
      });

      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Home');
    } catch (err) {
      console.error('Login/index.tsx', err);
      toaster.error('아이디 또는 비밀번호가 틀렸습니다.');

      switch (err.response.data.error_code) {
        case 106:
          toaster.error(err.response.data.detail);
          break;
        default:
          // cannot reach here
          break;
      }
    } finally {
      setLoading(false);
    }
  }, [id, pw, dispatch, navigation, toaster]);

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <VStack width="100%" alignItems="center">
        <Flex width="89%" alignItems="center">
          <Logo.mainLogo style={styles.logo} />
          <Logo.subLogo style={styles.subLogo} />

          <GButton
            theme={'yellow'}
            width="full"
            size="large"
            textProps={{ color: 'dark' }}
            isLoading={loading}
            onPress={loginReq}
          >
            <Image source={require('/assets/icons/Kakao/KakaoLogo.png')} />
            카카오 로그인
          </GButton>

          <GSpace h={'10%'} />
        </Flex>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default Login;
