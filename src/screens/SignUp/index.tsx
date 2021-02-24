import { Button } from '@/components';
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Check, { ICheckProps } from './Check';
import Input, { IInputProps } from './Input';
import styles from './SignUp.style';

function SignUpTemplate(): JSX.Element {
  // input
  const [id, setID] = useState(''); // ID
  const [pw, setPW] = useState(''); // PassWord
  const [pc, setPC] = useState(''); // Password Confirmation
  const [nn, setNN] = useState(''); // NickName
  const [nm, setNM] = useState(''); // NaMe
  const [pn, setPN] = useState(''); // Phone Number
  const [cd, setCD] = useState(''); // verification CoDe
  const [em, setEM] = useState(''); // EMail
  const [adr, setADR] = useState(''); // ADRess

  // checkbox
  // FIXME: 변수명 추천받아요
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);

  // TODO: useMemo
  const inputs: IInputProps[] = [
    {
      value: id,
      onChangeText: setID,
      placeholder: '아이디',
      invalidString: '5자 이상으로 된 영문 소문자, 숫자만 사용 가능합니다.',
      validString: '',
      isValid: id.length >= 5,
    },
    {
      // FIXME: feature 단계에서 수정: 비밀번호는 secure하게 해야 함
      value: pw,
      onChangeText: setPW,
      placeholder: '비밀번호',
      invalidString: '8자~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.',
      validString: '',
      isValid: false,
      marginBottom: 6,
    },
    {
      value: pc,
      onChangeText: setPC,
      placeholder: '비밀번호 확인',
      invalidString: '입력한 정보가 올바르지 않습니다.',
      validString: '',
      isValid: false,
    },
    {
      value: nn,
      onChangeText: setNN,
      placeholder: '닉네임',
      invalidString: '필수정보입니다.',
      validString: '',
      isValid: false,
    },
    {
      value: nm,
      onChangeText: setNM,
      placeholder: '이름',
      invalidString: '필수정보입니다.',
      validString: '',
      isValid: false,
    },
    {
      value: pn,
      onChangeText: setPN,
      placeholder: `전화번호 ('-') 제외`,
      invalidString: '필수정보입니다.',
      validString: '',
      isValid: false,
      marginBottom: 6,
      buttonString: '인증',
      buttonOnPress: () => true,
    },
    {
      value: cd,
      onChangeText: setCD,
      placeholder: '인증번호',
      invalidString: '인증번호가 올바르지 않습니다.',
      validString: '',
      isValid: false,
      buttonString: '확인',
      buttonOnPress: () => true,
    },
    {
      value: em,
      onChangeText: setEM,
      placeholder: '이메일',
      invalidString: '필수정보입니다.',
      validString: '',
      isValid: false,
      buttonString: '인증',
      buttonOnPress: () => true,
    },
    {
      value: adr,
      onChangeText: setADR,
      placeholder: '상세주소 (선택)',
      invalidString: '',
      validString: '',
      marginBottom: 31,
    },
  ];

  // TODO: useMemo
  // FIXME: onPress를 토글 함수로
  const checks: ICheckProps[] = [
    {
      title: '같구 이용약관 동의',
      checked: a1,
      isOptional: false,
      onPress: () => setA1(true),
    },
    {
      title: '개인정보 수집 및 이용 동의',
      checked: a2,
      isOptional: false,
      onPress: () => setA2(true),
    },
    {
      title: '위치정보 이용약관 동의',
      checked: a3,
      isOptional: true,
      onPress: () => setA3(true),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>같구에 오신 것을 환영합니다.</Text>
      <View>
        {inputs.map((item, i) => (
          <Input {...item} key={i} />
        ))}
      </View>
      <View>
        {checks.map((item, i) => (
          <Check {...item} key={i} />
        ))}
      </View>
      {/* FIXME: onPress */}
      <Button
        title="가입하기"
        style={styles.confirmBtnCon}
        textStyle={styles.confirmBtnText}
        onPress={() => true}
      />
    </ScrollView>
  );
}

export default SignUpTemplate;
