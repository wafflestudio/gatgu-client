import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { Flex } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { setRequesterToken } from '@/apis/BaseInstance';
import { login } from '@/apis/UserApi';
import Logo from '@/assets/icons/Logo';
import { Button } from '@/components';
import { GButton } from '@/components/Gatgu/GButton';
import { GSpace } from '@/components/Gatgu/GSpace';
import { GText } from '@/components/Gatgu/GText';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { setLoginState } from '@/store/userSlice';
import { palette } from '@/styles';

import styles from './Login.style';

function LoginTemplate(): JSX.Element {
  const [id, setID] = useState('');
  // FIXME: @woohm402
  //   todo: pw는 암호화해야 함
  //   when: user 최최최종 마무리 PR에서 하겠습니다
  const [pw, setPW] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginReq = useCallback(async () => {
    try {
      const loginResponse = await login(id, pw);
      const { access, refresh } = loginResponse.data.token;
      setRequesterToken(access);
      dispatch(setLoginState(false));

      ObjectStorage.addObject(asyncStoragekey.ACCESS_TOKEN, {
        data: access,
        expiry: DateTime.now().plus({ day: 1 }).toSeconds(),
      });
      ObjectStorage.addObject(asyncStoragekey.REFRESH_TOKEN, {
        data: refresh,
        expiry: DateTime.now().plus({ day: 30 }).toSeconds(),
      });
      navigation.navigate('Home');
    } catch (err) {
      switch (err.response.data.error_code) {
        case 106:
          Alert.alert(err.response.data.detail);
          break;
        default:
          // cannot reach here
          break;
      }
    }
  }, [id, pw, dispatch, navigation]);

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Flex alignItems="center" style={styles.container}>
      <Flex width="262" alignItems="center">
        <Logo.subLogo style={styles.logo} />
        <View>
          <TextInput
            style={styles.input}
            value={id}
            placeholder="아이디"
            onChangeText={setID}
            placeholderTextColor={palette.gray}
          />
          <TextInput
            style={styles.input}
            textContentType={'password'}
            value={pw}
            placeholder="비밀번호"
            onChangeText={setPW}
            placeholderTextColor={palette.gray}
          />
        </View>
        <GButton
          width="full"
          size="large"
          textProps={{ bold: true }}
          onPress={loginReq}
        >
          로그인
        </GButton>
        <GSpace h={20} />
        <GText
          touchable
          size="big"
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

export default LoginTemplate;
