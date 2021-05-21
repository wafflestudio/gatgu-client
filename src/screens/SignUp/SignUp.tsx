import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';

import { useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { Button } from '@/components';
import * as validate from '@/helpers/functions/validate';
import { login } from '@/store/userSlice';
import { flexRow } from '@/styles/wrapper';

import Check, { ICheckProps } from './Check';
import checkStyles from './Check.style';
import Input, { IInputProps } from './Input';
import styles from './SignUp.style';

function SignUpTemplate(): JSX.Element {
  // input
  const [id, setID] = useState(''); // ID
  const [pw, setPW] = useState(''); // PassWord
  const [pc, setPC] = useState(''); // Password Confirmation
  const [nn, setNN] = useState(''); // NickName
  const [em, setEM] = useState(''); // EMail
  const [cd, setCD] = useState(''); // verification CoDe

  // checkboxes
  const [cAll, setCAll] = useState(false);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // TODO: woohm402
  //   API call 해서 중복 닉네임 | Id인지 확인
  const inputs: IInputProps[] = [
    useMemo(
      () => ({
        value: id,
        onChangeText: setID,
        title: '아이디',
        invalidString: '5자 이상으로 된 영문 소문자, 숫자만 사용 가능합니다.',
        validString: '사용 가능한 아이디입니다.',
        isValid: validate.validateID(id),
      }),
      [id, setID]
    ),
    useMemo(
      () => ({
        value: pw,
        onChangeText: setPW,
        title: '비밀번호',
        invalidString: '8자~16자 영문 대소문자, 숫자를 모두 사용하세요.',
        validString: '사용 가능한 비밀번호입니다.',
        isValid: validate.validatePW(pw),
        marginBottom: 6,
      }),
      [pw, setPW]
    ),
    useMemo(
      () => ({
        value: pc,
        onChangeText: setPC,
        title: '비밀번호 확인',
        invalidString: '입력한 정보가 올바르지 않습니다.',
        validString: '비밀번호가 일치합니다.',
        isValid: validate.validatePC(pw, pc),
      }),
      [pw, pc, setPC]
    ),
    useMemo(
      () => ({
        value: nn,
        onChangeText: setNN,
        title: '닉네임',
        invalidString: '필수정보입니다.',
        validString: '사용 가능한 닉네임입니다.',
        isValid: validate.validateNN(nn),
      }),
      [nn, setNN]
    ),
    useMemo(
      () => ({
        value: em,
        onChangeText: setEM,
        title: '이메일',
        invalidString: '필수정보입니다.',
        validString: '',
        isValid: validate.validateEM(em),
        buttonString: '인증',
        buttonOnPress: () =>
          userAPI
            .confirm(em + '@snu.ac.kr')
            .then(() => Alert.alert('인증 메일을 발송하였습니다.'))
            .catch(() => Alert.alert('인증 메일 발송에 실패하였습니다.')),
        marginBottom: 6,
      }),
      [em, setEM]
    ),
    useMemo(
      () => ({
        value: cd,
        onChangeText: setCD,
        title: '인증번호',
        invalidString: '필수정보입니다.',
        validString: '',
        isValid: validate.validateCD(cd, cd),
        buttonString: '확인',
        buttonOnPress: () =>
          userAPI
            .activate(em + '@snu.ac.kr', cd)
            .then(() => Alert.alert('인증되었습니다.'))
            .catch(() => Alert.alert('잘못된 코드입니다.')),
        marginBottom: 6,
      }),
      [em, cd, setCD]
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

  let signUpAble = true;
  for (const item of inputs) {
    signUpAble = signUpAble && item.isValid;
  }
  signUpAble = signUpAble && cAll;

  const signUp = useCallback(() => {
    if (!signUpAble) return;
    userAPI
      .signUp(id, pw, nn, em + '@snu.ac.kr')
      .then(() => {
        dispatch(login(id, pw, navigation));
      })
      .catch((err: AxiosError) => {
        console.error(err);
        switch (parseInt(err.code + '')) {
          case 400:
            Alert.alert(err.message);
            break;
          default:
            Alert.alert('unknown error');
            console.error(err);
            break;
        }
      });
  }, [id, pw, nn, em, dispatch, navigation, signUpAble]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>같구에 오신 것을 환영합니다.</Text>
      <View>
        {inputs.map((item, i) => (
          <Input {...item} key={i} />
        ))}
        <View style={styles.emailControl}>
          <Text style={{ color: 'red' }}>유효시간 00분 00초</Text>
          <View style={{ ...flexRow }}>
            <Button
              title="재발송"
              textStyle={checkStyles.contentBtn}
              onPress={() => Alert.alert('not implemented')}
            />
            <View style={{ width: 30 }} />
            <Button
              title="시간연장"
              textStyle={checkStyles.contentBtn}
              onPress={() => Alert.alert('not implemented')}
            />
          </View>
        </View>
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
        style={signUpAble ? styles.confirmBtnConO : styles.confirmBtnConX}
        textStyle={styles.confirmBtnText}
        onPress={signUp}
      />
    </ScrollView>
  );
}

export default SignUpTemplate;
