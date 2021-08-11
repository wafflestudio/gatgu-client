import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AxiosError } from 'axios';
import { Formik } from 'formik';
import get from 'lodash/get';
import { DateTime } from 'luxon';

import { useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { Button } from '@/components';
import Timer from '@/components/Common/Timer';
import {
  isValidEmail,
  isValidUsername,
  isValidNickname,
  isValidPasswordConfirm,
  isValidPassword,
} from '@/helpers/functions/validate';
import Input from '@/screens/AuthStack/SignUp/Input';
import { flexRow } from '@/styles/wrapper';

import Check from './Check';
import checkStyles from './Check.style';
import styles from './SignUp.style';

export interface ISignUpValues {
  username: string;
  password: string;
  nickname: string;
  email: string;
  trade_address: string;
  passwordConfirm: string;
  emailConfirm: string;
  isAllCheckboxesSelected: boolean;
  checkbox1IsSelected: boolean;
  checkbox2IsSelected: boolean;
  checkbox3IsSelected: boolean;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const [emailEndsAt, setEmailEndsAt] = useState<DateTime | null>(null);

  const signUp = useCallback(
    (values: ISignUpValues) => {
      userAPI
        .signUp(
          values.username,
          values.password,
          values.email + '@snu.ac.kr',
          values.nickname,
          values.trade_address
        )
        .then(() => {
          Alert.alert('회원가입이 완료되었습니다.');
          navigation.navigate('Login');
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            // 서버에서 2xx 가 아닌 response를 내려줌
            switch (error.response.status) {
              case 400:
                // 무슨 메세지가 있을거임
                Alert.alert(get(error, ['response', 'data', 'error']));
                break;
              case 403:
                // csrf error
                Alert.alert(get(error, ['response', 'data', 'detail']));
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
    },
    [navigation]
  );

  const signUpInitialValues = useMemo(
    () => ({
      // values
      username: '',
      password: '',
      nickname: '',
      email: '',
      trade_address: '',

      // fake values
      emailConfirm: '',
      passwordConfirm: '',

      // checkBoxes
      isAllCheckboxesSelected: false,
      checkbox1IsSelected: false,
      checkbox2IsSelected: false,
      checkbox3IsSelected: false,
    }),
    []
  );

  const validate = (values: ISignUpValues) => {
    const errors = {};
    // username
    const username =
      values.username &&
      !isValidUsername(values.username) &&
      '5자 이상으로 된 영문 소문자, 숫자만 사용 가능합니다.';
    if (username) Object.assign(errors, { username });
    // password
    const password =
      values.password &&
      !isValidPassword(values.password) &&
      '8자~16자 영문 대소문자, 숫자를 모두 사용하세요.';
    if (password) Object.assign(errors, { password });
    // password confirm
    const passwordConfirm =
      values.passwordConfirm &&
      !isValidPasswordConfirm(values.password, values.passwordConfirm) &&
      '입력한 정보가 올바르지 않습니다.';
    if (passwordConfirm) Object.assign(errors, { passwordConfirm });
    // nickname
    const nickname =
      values.nickname && !isValidNickname(values.nickname) && '필수정보입니다.';
    if (nickname) Object.assign(errors, { nickname });
    // email
    const email =
      values.email && !isValidEmail(values.email) && '필수정보입니다.';
    if (email) Object.assign(errors, { email });
    // trade address & email confirm : pass

    return errors;
  };

  return (
    <Formik<ISignUpValues>
      initialValues={signUpInitialValues}
      onSubmit={signUp}
      validate={validate}
    >
      {({ values, handleChange, setFieldValue, handleSubmit, errors }) => (
        <KeyboardAwareScrollView style={styles.container}>
          <Text style={styles.title}>같구에 오신 것을 환영합니다.</Text>
          <Input
            title="아이디"
            onChangeText={handleChange('username')}
            value={values.username}
            errorStr={errors.username}
          />
          <Input
            title="비밀번호"
            marginBottom={6}
            value={values.password}
            onChangeText={handleChange('password')}
            errorStr={errors.password}
          />
          <Input
            title="비밀번호 확인"
            value={values.passwordConfirm}
            onChangeText={handleChange('passwordConfirm')}
            errorStr={errors.passwordConfirm}
          />
          <Input
            value={values.nickname}
            onChangeText={handleChange('nickname')}
            title="닉네임"
            errorStr={errors.nickname}
          />
          <Input
            value={values.trade_address}
            onChangeText={handleChange('trade_address')}
            title="주 거래 지역"
            errorStr={errors.trade_address}
          />
          <Input
            value={values.email}
            onChangeText={handleChange('email')}
            title="이메일"
            buttonString="인증"
            buttonOnPress={() =>
              userAPI
                .sendConfirmCodeMail(values.email + '@snu.ac.kr')
                .then(() => {
                  Alert.alert('인증 메일을 발송하였습니다.');
                  setEmailEndsAt(DateTime.local().plus({ minute: 3 }));
                })
                .catch((error) => {
                  Alert.alert('인증 메일 발송에 실패하였습니다.');
                  console.debug(error.config);
                })
            }
            marginBottom={6}
            errorStr={errors.email}
          />
          <Input
            value={values.emailConfirm}
            onChangeText={handleChange('emailConfirm')}
            title="인증번호"
            buttonString="확인"
            buttonOnPress={() =>
              userAPI
                .confirmMailCode(
                  values.email + '@snu.ac.kr',
                  values.emailConfirm
                )
                .then(() => Alert.alert('인증되었습니다.'))
                .catch(() => {
                  Alert.alert('잘못된 코드입니다.');
                })
            }
            marginBottom={6}
            errorStr={errors.emailConfirm}
          />

          <View style={styles.emailControl}>
            {emailEndsAt && (
              <Timer
                style={{ color: 'red' }}
                endAt={emailEndsAt}
                options={{
                  format: 'mm:ss',
                }}
                onEnd={() => setEmailEndsAt(null)}
              />
            )}
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
          <View style={checkStyles.titleContainer}>
            <Button
              title=""
              style={
                values.isAllCheckboxesSelected
                  ? checkStyles.buttonTrue
                  : checkStyles.buttonFalse
              }
              onPress={() => {
                setFieldValue(
                  'isAllCheckboxesSelected',
                  !values.isAllCheckboxesSelected
                );
                setFieldValue(
                  'checkbox1IsSelected',
                  !values.isAllCheckboxesSelected
                );
                setFieldValue(
                  'checkbox2IsSelected',
                  !values.isAllCheckboxesSelected
                );
                setFieldValue(
                  'checkbox3IsSelected',
                  !values.isAllCheckboxesSelected
                );
              }}
            />
            <View style={checkStyles.textWrapper}>
              <Text style={checkStyles.allTitle}>
                같구 이용약관, 개인정보 수집 및 이용, 위치정보 이용약관(선택)에
                모두 동의합니다.
              </Text>
            </View>
          </View>
          <View>
            <Check
              checked={values.checkbox1IsSelected}
              title="같구 이용약관 동의"
              onPress={() => {
                setFieldValue(
                  'checkbox1IsSelected',
                  !values.checkbox1IsSelected
                );
                setFieldValue(
                  'isAllCheckboxesSelected',
                  !values.checkbox1IsSelected &&
                    values.checkbox2IsSelected &&
                    values.checkbox3IsSelected
                );
              }}
            />
            <Check
              checked={values.checkbox2IsSelected}
              title="개인정보 수집 및 이용 동의"
              onPress={() => {
                setFieldValue(
                  'checkbox2IsSelected',
                  !values.checkbox2IsSelected
                );
                setFieldValue(
                  'isAllCheckboxesSelected',
                  values.checkbox1IsSelected &&
                    !values.checkbox2IsSelected &&
                    values.checkbox3IsSelected
                );
              }}
            />
            <Check
              checked={values.checkbox3IsSelected}
              title="위치정보 이용약관 동의"
              onPress={() => {
                setFieldValue(
                  'checkbox3IsSelected',
                  !values.checkbox3IsSelected
                );
                setFieldValue(
                  'isAllCheckboxesSelected',
                  values.checkbox1IsSelected &&
                    values.checkbox2IsSelected &&
                    !values.checkbox3IsSelected
                );
              }}
              isOptional={true}
            />
          </View>
          <Button
            title="가입하기"
            style={
              values.isAllCheckboxesSelected
                ? styles.confirmBtnConO
                : styles.confirmBtnConX
            }
            textStyle={styles.confirmBtnText}
            onPress={handleSubmit}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default SignUp;
