import React, { useCallback, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex, VStack } from 'native-base';

import { StackActions, useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { setRequesterToken } from '@/apis/apiClient';
import Logo from '@/assets/icons/Logo';
import { GInput } from '@/components/Gatgu';
import { GButton } from '@/components/Gatgu/GButton';
import { GSpace } from '@/components/Gatgu/GSpace';
import { GText } from '@/components/Gatgu/GText';
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
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default Login;
