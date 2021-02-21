import { login } from '@/store/userSlice';
import { Button } from '@/components';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './Login.style';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

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
    //
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}></View>
      <View>
        <TextInput
          style={styles.input}
          value={id}
          placeholder="아이디"
          onChangeText={setID}
        />
        {/* FIXME: value={"*" * pw.length} */}
        <TextInput
          style={styles.input}
          value={pw}
          placeholder="비밀번호"
          onChangeText={setPW}
        />
      </View>
      <Button title="로그인" onPress={loginReq} style={styles.loginBtn} />
      <Button title="회원가입" onPress={signUp} style={styles.signUpBtn} />
    </View>
  );
}

export default LoginTemplate;
