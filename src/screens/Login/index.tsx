import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { setRequesterToken } from '@/apis/BaseInstance';
import { login } from '@/apis/UserApi';
import logo from '@/assets/Logo';
import { Button } from '@/components';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { StringStorage } from '@/helpers/functions/asyncStorage';
import { setAccessToken } from '@/store/userSlice';
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
      dispatch(setAccessToken(access));
      setRequesterToken(access);
      StringStorage.add(asyncStoragekey.REFRESH_TOKEN, refresh);
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
    <View style={styles.container}>
      <logo.subLogo style={styles.logo} />
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
      <Button
        title="로그인"
        onPress={loginReq}
        style={styles.loginBtn}
        textStyle={styles.loginBtnText}
      />
      <Button
        title="회원가입"
        onPress={signUp}
        style={styles.signUpBtn}
        textStyle={styles.signUpBtnText}
      />
    </View>
  );
}

export default LoginTemplate;
