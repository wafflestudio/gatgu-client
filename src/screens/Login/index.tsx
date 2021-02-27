import { login } from '@/store/userSlice';
import { Button } from '@/components';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './Login.style';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import logo from '@/assets/Logo';
import { palette } from '@/styles';

function LoginTemplate(): JSX.Element {
  const [id, setID] = useState('');
  // FIXME: pw는 암호화해야 함
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
        {/* FIXME: value={"*" * pw.length} */}
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
