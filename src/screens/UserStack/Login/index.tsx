import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex } from 'native-base';

import { StackActions, useNavigation } from '@react-navigation/native';

import { login } from '@/apis/UserApi';
import { setRequesterToken } from '@/apis/apiClient';
import Logo from '@/assets/icons/Logo';
import { GInput } from '@/components/Gatgu';
import { GButton } from '@/components/Gatgu/GButton';
import { GSpace } from '@/components/Gatgu/GSpace';
import { GText } from '@/components/Gatgu/GText';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { useToaster } from '@/helpers/hooks';
import { setLoginState } from '@/store/userSlice';

import styles from './Login.style';

function Login(): JSX.Element {
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const toaster = useToaster();
  const dispatch = useDispatch();

  const loginReq = useCallback(async () => {
    setLoading(true);
    try {
      const loginResponse = await login(id, pw);
      const { access, refresh } = loginResponse.data.token;
      setRequesterToken(access);
      dispatch(setLoginState(true));

      ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
        data: access,
        expiry: DateTime.now().plus({ day: 1 }).toSeconds(),
      });
      ObjectStorage.addObject(asyncStoragekey.REFRESH_TOKEN, {
        data: refresh,
        expiry: DateTime.now().plus({ day: 30 }).toSeconds(),
      });
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Home');
    } catch (err) {
      console.error('Login/index.tsx', err);
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
  }, [id, pw, dispatch, navigation]);

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Flex alignItems="center" style={styles.container}>
      <Flex width="262px" alignItems="center">
        <Logo.subLogo style={styles.logo} />
        <Flex width="100%" mb="40px">
          <GInput
            width="full"
            theme="white"
            value={id}
            placeholder="아이디"
            onChangeText={setID}
          />
          <GSpace h={10} />
          <GInput
            width="full"
            theme="white"
            type="password"
            value={pw}
            placeholder="비밀번호"
            onChangeText={setPW}
          />
        </Flex>
        <GButton
          width="full"
          size="large"
          textProps={{ bold: true }}
          isLoading={loading}
          onPress={loginReq}
        >
          로그인
        </GButton>
        <GSpace h={20} />
        <GText
          touchable
          size={15}
          color="gray"
          textDecorationLine="underline"
          onPress={signUp}
        >
          회원가입
        </GText>
      </Flex>
    </Flex>
  );
}

export default Login;
