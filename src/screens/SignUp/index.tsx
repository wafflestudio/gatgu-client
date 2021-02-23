import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Check, { ICheckProps } from './Check';
import Input, { IInputProps } from './Input';

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

  const inputs: IInputProps[] = [
    {
      value: id,
      onChangeText: setID,
      placeholder: '아이디',
      warnString: '5자 이상으로 된 영문 소문자, 숫자만 사용 가능합니다.',
      checkString: '',
      available: id.length >= 5,
    },
    {
      value: pw,
      onChangeText: setPW,
      placeholder: '비밀번호',
      warnString: '8자~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.',
      checkString: '',
      available: false,
    },
    {
      value: pc,
      onChangeText: setPC,
      placeholder: '비밀번호 확인',
      warnString: '입력한 정보가 올바르지 않습니다.',
      checkString: '',
      available: false,
    },
    {
      value: nn,
      onChangeText: setNN,
      placeholder: '닉네임',
      warnString: '필수정보입니다.',
      checkString: '',
      available: false,
    },
    {
      value: nm,
      onChangeText: setNM,
      placeholder: '이름',
      warnString: '필수정보입니다.',
      checkString: '',
      available: false,
    },
    {
      value: pn,
      onChangeText: setPN,
      placeholder: `전화번호 ('-') 제외`,
      warnString: '필수정보입니다.',
      checkString: '',
      available: false,
    },
    {
      value: cd,
      onChangeText: setCD,
      placeholder: '인증번호',
      warnString: '인증번호가 올바르지 않습니다.',
      checkString: '',
      available: false,
    },
    {
      value: em,
      onChangeText: setEM,
      placeholder: '이메일',
      warnString: '필수정보입니다.',
      checkString: '',
      available: false,
    },
    {
      value: adr,
      onChangeText: setADR,
      placeholder: '상세주소 (선택)',
      warnString: '',
      checkString: '',
    },
  ];

  const checks: ICheckProps[] = [
    { title: '같구 이용약관 동의', checked: a1, setCheck: setA1 },
    { title: '개인정보 수집 및 이용 동의', checked: a2, setCheck: setA2 },
    { title: '위치정보 이용약관 동의', checked: a3, setCheck: setA3 },
  ];

  return (
    <View>
      <Text>같구에 오신 것을 환영합니다.</Text>
      {inputs.map((item, i) => (
        <Input {...item} key={i} />
      ))}
      {checks.map((item, i) => (
        <Check {...item} key={i} />
      ))}
    </View>
  );
}

export default SignUpTemplate;
