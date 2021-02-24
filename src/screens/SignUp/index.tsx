import { Button } from '@/components';
import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Check, { ICheckProps } from './Check';
import Input, { IInputProps } from './Input';
import styles from './SignUp.style';
import checkStyles from './Check.style';
import { userAPI } from '@/apis';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';

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

  // checkboxes
  const [cAll, setCAll] = useState(false);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  const navigation = useNavigation();

  // TODO: API call 해서 중복 닉네임 | Id인지 확인
  const inputs: IInputProps[] = [
    useMemo(
      () => ({
        value: id,
        onChangeText: setID,
        placeholder: '아이디',
        invalidString: '5자 이상으로 된 영문 소문자, 숫자만 사용 가능합니다.',
        validString: '사용 가능한 아이디입니다.',
        isValid: /^[a-z0-9]{5,}$/.test(id),
      }),
      [id, setID]
    ),
    useMemo(
      () => ({
        // FIXME: feature 단계에서 수정: 비밀번호는 secure하게 해야 함
        // FIXME: 허용할 특수문자 범위 지정 필요
        value: pw,
        onChangeText: setPW,
        placeholder: '비밀번호',
        invalidString: '8자~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.',
        validString: '사용 가능한 비밀번호입니다.',
        isValid: /^(?=.*[0-9])(?=.*[a-z]+)(?=.*[A-Z]+).{8,16}$/.test(pw),
        marginBottom: 6,
      }),
      [pw, setPW]
    ),
    useMemo(
      () => ({
        value: pc,
        onChangeText: setPC,
        placeholder: '비밀번호 확인',
        invalidString: '입력한 정보가 올바르지 않습니다.',
        validString: '비밀번호가 일치합니다.',
        isValid: pw.localeCompare(pc) === 0 && pw.length >= 1,
      }),
      [pw, pc, setPC]
    ),
    useMemo(
      () => ({
        value: nn,
        onChangeText: setNN,
        placeholder: '닉네임',
        invalidString: '필수정보입니다.',
        validString: '사용 가능한 닉네임입니다.',
        isValid: nn.length >= 1,
      }),
      [nn, setNN]
    ),
    useMemo(
      () => ({
        value: nm,
        onChangeText: setNM,
        placeholder: '이름',
        invalidString: '필수정보입니다.',
        validString: '',
        isValid: nm.length >= 1,
      }),
      [nm, setNM]
    ),
    useMemo(
      () => ({
        value: pn,
        onChangeText: setPN,
        placeholder: `전화번호 ('-') 제외`,
        invalidString: '필수정보입니다.',
        validString: '',
        isValid: /[0-9]{10,11}/.test(pn),
        marginBottom: 6,
        buttonString: '인증',
        buttonOnPress: () => true,
      }),
      [pn, setPN]
    ),
    useMemo(
      () => ({
        value: cd,
        onChangeText: setCD,
        placeholder: '인증번호',
        invalidString: '인증번호가 올바르지 않습니다.',
        validString: '',
        isValid: false,
        buttonString: '확인',
        buttonOnPress: () => true,
      }),
      [cd, setCD]
    ),
    useMemo(
      () => ({
        value: em,
        onChangeText: setEM,
        placeholder: '이메일',
        invalidString: '필수정보입니다.',
        validString: '',
        isValid: em.length >= 1,
        buttonString: '인증',
        buttonOnPress: () => true,
      }),
      [em, setEM]
    ),
    useMemo(
      () => ({
        value: adr,
        onChangeText: setADR,
        placeholder: '상세주소 (선택)',
        invalidString: '',
        validString: '',
        marginBottom: 31,
      }),
      [adr, setADR]
    ),
  ];

  const select = useCallback(
    (target: string) => {
      switch (target) {
        case 'cAll':
          setCAll(!cAll);
          setC1(!cAll);
          setC2(!cAll);
          setC3(!cAll);
          break;
        case 'c1':
          setCAll(!c1 && c2 && c3);
          setC1(!c1);
          break;
        case 'c2':
          setCAll(c1 && !c2 && c3);
          setC2(!c2);
          break;
        case 'c3':
          setCAll(c1 && c2 && !c3);
          setC3(!c3);
          break;
        default:
          throw new Error('cannot reach here');
      }
    },
    [c1, c2, c3, cAll, setC1, setC2, setC3, setCAll]
  );

  const checks: ICheckProps[] = useMemo(
    () => [
      {
        title: '같구 이용약관 동의',
        checked: c1,
        isOptional: false,
        onPress: () => select('c1'),
      },
      {
        title: '개인정보 수집 및 이용 동의',
        checked: c2,
        isOptional: false,
        onPress: () => select('c2'),
      },
      {
        title: '위치정보 이용약관 동의',
        checked: c3,
        isOptional: true,
        onPress: () => select('c3'),
      },
    ],
    [c1, c2, c3, select]
  );

  // FIXME: 백엔드와 디자인 사이 논의가 끝나고 나면 signUp에 들어갈 인자들 제대로 구현
  const signUp = () => {
    userAPI
      .signUp('', '', '', '', '', '', '', '', '')
      .then(() => {
        alert('회원가입에 성공하였습니다.');
        // TODO: 논의 필요: 바로 로그인시킬 건지 로그인 창으로 보낼 건지
        navigation.goBack();
      })
      .catch((err: AxiosError) => {
        switch (err.code) {
          case '400':
            alert(err.message);
            break;
          default:
            alert('unknown error');
            break;
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>같구에 오신 것을 환영합니다.</Text>
      <View>
        {inputs.map((item, i) => (
          <Input {...item} key={i} />
        ))}
      </View>
      <View style={checkStyles.titleContainer}>
        <Button
          title=""
          style={cAll ? checkStyles.buttonTrue : checkStyles.buttonFalse}
          onPress={() => select('cAll')}
        />
        <View style={checkStyles.textWrapper}>
          <Text style={checkStyles.allTitle}>
            같구 이용약관, 개인정보 수집 및 이용, 위치정보 이용약관(선택)에 모두
            동의합니다.
          </Text>
        </View>
      </View>
      <View>
        {checks.map((item, i) => (
          <Check {...item} key={i} />
        ))}
      </View>
      <Button
        title="가입하기"
        style={styles.confirmBtnCon}
        textStyle={styles.confirmBtnText}
        onPress={signUp}
      />
    </ScrollView>
  );
}

export default SignUpTemplate;
