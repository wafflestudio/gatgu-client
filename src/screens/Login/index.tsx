import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import get from 'lodash/get';

import { useNavigation } from '@react-navigation/native';

import { flushSession, login } from '@/apis/UserApi';
import logo from '@/assets/Logo';
import { Button } from '@/components';
import { setToken } from '@/store/userSlice';
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

  const loginReq = useCallback(() => {
    login(id, pw)
      .then((response) => {
        dispatch(setToken(response.data.token));
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          // 서버에서 2xx 가 아닌 response를 내려줌
          switch (error.response.status) {
            case 401:
              // wrong id / pw
              Alert.alert(get(error, ['response', 'data', 'error']));
              break;
            case 403:
              // csrf error
              Alert.alert(get(error, ['response', 'data', 'detail']));
              flushSession();
              break;
            default:
              // 예상치 못한 에러 코드
              Alert.alert(
                '예상치 못한 에러가 발생했습니다. 고객센터로 문의해주시기 바랍니다.'
              );
          }
        } else if (error.request) {
          // 서버에서 response 자체가 안 옴
          Alert.alert('서버와 연결할 수 없습니다.');
        }
        // 디버깅 용도
        console.debug(error.config);
      });
  }, [id, pw, dispatch]);

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
