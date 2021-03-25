import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import logo from '@/assets/Logo';
import { Button } from '@/components';
import { login } from '@/store/userSlice';
import { palette } from '@/styles';

import styles from './Login.style';

function LoginTemplate(): JSX.Element {
  const [id, setID] = useState('');
  // FIXME: @woohm402
  //   todo: pw는 암호화해야 함
  //   when: user 최최최종 마무리 PR에서 하겠습니다
  const [pw, setPW] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginReq = useCallback(() => {
    if (!id || !pw) return;
    dispatch(login(id, pw, navigation));
  }, [dispatch, navigation, id, pw]);

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
        {/* 
          FIXME: @woohm402
            todo: value={"*" * pw.length}
                  로 수정해야 합니다
            when: 최종 마무리에서 하겠습니다, 디버깅을 위해 놔뒀어요
        */}
        <TextInput
          style={styles.input}
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
