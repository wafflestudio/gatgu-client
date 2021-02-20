import { Button } from '@/components';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './Login.style';

function LoginTemplate(): JSX.Element {
  const [id, setID] = useState('');
  // FIXME: pw는 암호화해야 함
  const [pw, setPW] = useState('');

  const login = () => {
    //
  };

  const signUp = () => {
    //
  };

  return (
    <>
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
        <Button title="로그인" onPress={login} style={styles.loginBtn} />
        <Button title="회원가입" onPress={signUp} style={styles.signUpBtn} />
      </View>
    </>
  );
}

export default LoginTemplate;
