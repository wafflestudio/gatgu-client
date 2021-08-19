import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, Alert, Platform } from 'react-native';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { DateTime } from 'luxon';
import { HStack, KeyboardAvoidingView, Modal, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { userAPI } from '@/apis';
import { Button } from '@/components';
import { GButton, GInput, GSpace, GText } from '@/components/Gatgu';
import { getTs } from '@/helpers/functions/time';
import {
  isValidEmail,
  isValidUsername,
  isValidNickname,
  isValidPasswordConfirm,
  isValidPassword,
} from '@/helpers/functions/validate';
import { useToaster } from '@/helpers/hooks';
import SignUpInput from '@/screens/UserStack/SignUp/SignUpInput';

import FindAddressWebview from '../components/FindAddressWebview/FindAddressWebview';
import TokenTimer from '../components/TokenTimer/TokenTimer';
import Check from './Check';
import checkStyles from './Check.style';
import styles from './SignUp.style';

export interface ISignUpValues {
  username: string;
  password: string;
  nickname: string;
  email: string;
  tradingAddress: string;
  tradingAddressDetail: string;
  passwordConfirm: string;
  emailConfirm: string;
  isAllCheckboxesSelected: boolean;
  checkbox1IsSelected: boolean;
  checkbox2IsSelected: boolean;
  checkbox3IsSelected: boolean;
}

const DEFAULT_FORM_VALUE = {
  // values
  username: '',
  password: '',
  nickname: '',
  email: '',
  tradingAddress: '',
  tradingAddressDetail: '',

  // fake values
  emailConfirm: '',
  passwordConfirm: '',

  // checkBoxes
  isAllCheckboxesSelected: false,
  checkbox1IsSelected: false,
  checkbox2IsSelected: false,
  checkbox3IsSelected: false,
};

type SignUpErrors = Partial<Record<keyof ISignUpValues, string>>;

const SignUp: React.FC = () => {
  const toaster = useToaster();
  const navigation = useNavigation();

  const [isEmailSending, setEmailSending] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);

  const [isTokenValidating, setTokenValidating] = useState(false);
  const [isTokenConfirmDisabled, setTokenConfirmDisabled] = useState(true);
  const [emailTokenExpireTs, setEmailTokenExpireTs] = useState<number>();
  const [isTokenValid, setTokenValid] = useState(false);

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});

  const handleSignUpError = (errorCode: number) => {
    const _signUpErrors: SignUpErrors = {};

    switch (errorCode) {
      case 103:
        _signUpErrors['email'] = '인증되지 않은 이메일입니다.';
        break;
      case 104:
        _signUpErrors['nickname'] = '이미 사용중인 닉네임입니다.';
        break;
      case 105:
        _signUpErrors['username'] = '이미 사용중인 아이디입니다.';
        break;
      // no default
    }
    setSignUpErrors(_signUpErrors);
  };

  const handleEmailErrorCode = (errorCode: number) => {
    switch (errorCode) {
      case 103:
        setErrors({ emailConfirm: '인증 코드가 일치하지 않습니다.' });
        break;
      case 114:
        setErrors({ emailConfirm: '시간이 초과되었습니다.' });
        break;
    }
  };

  const handleFormSubmit = useCallback(
    (values: ISignUpValues) => {
      userAPI
        .signUp(
          values.username,
          values.password,
          values.email + '@snu.ac.kr',
          values.nickname,
          values.tradingAddress + ' ' + values.tradingAddressDetail.trim()
        )
        .then(() => {
          toaster.success('회원가입이 완료되었습니다.');
          navigation.navigate('Login');
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            switch (error.response.status) {
              // 인증되지 않은 이메일, 필수 항목 누락, 닉네임 중복, 아이디 중복
              case 400:
                toaster.error(get(error, ['response', 'data', 'detail']));
                handleSignUpError(error.response.data?.error_code);
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
    [navigation, toaster]
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

    return { ...signUpErrors, ...errors };
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleSubmit,
    setErrors,
  } = useFormik({
    initialValues: DEFAULT_FORM_VALUE,
    onSubmit: handleFormSubmit,
    validate,
  });

  const handleEmailSend = () => {
    setEmailSending(true);
    userAPI
      .sendConfirmCodeMail(values.email + '@snu.ac.kr')
      .then(() => {
        toaster.info('인증 메일을 발송하였습니다.');
        setTokenConfirmDisabled(false);
        setEmailTokenExpireTs(getTs(DateTime.now().plus({ minute: 3 })));
        setEmailSent(true);
      })
      .catch((error) => {
        toaster.error('인증 메일 발송에 실패하였습니다.');
        console.debug(error.config);
      })
      .finally(() => {
        setEmailSending(false);
      });
  };

  const handleEmailCodeChecking = (email: string, code: string) => {
    setTokenValidating(true);
    userAPI
      .confirmMailCode(email + '@snu.ac.kr', code)
      .then(() => {
        setTokenValid(true);
        toaster.success('인증되었습니다.');
      })
      .catch((error: AxiosError) => {
        handleEmailErrorCode(error.response?.data?.error_code);
      })
      .finally(() => {
        setTokenValidating(false);
      });
  };

  const handleAddressSelect = (address: string) => {
    setAddressModalOpen(false);
    setFieldValue('tradingAddress', address);
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        h={{
          base: '1000px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>같구에 오신 것을 환영합니다.</Text>
        <SignUpInput
          title="아이디"
          onChangeText={handleChange('username')}
          value={values.username}
          errorStr={errors.username}
        />
        <SignUpInput
          title="비밀번호"
          marginBottom={14}
          value={values.password}
          type="password"
          errorStr={errors.password}
          onChangeText={handleChange('password')}
        />
        <SignUpInput
          title="비밀번호 확인"
          value={values.passwordConfirm}
          type="password"
          errorStr={errors.passwordConfirm}
          onChangeText={handleChange('passwordConfirm')}
        />
        <SignUpInput
          value={values.nickname}
          onChangeText={handleChange('nickname')}
          title="닉네임"
          errorStr={errors.nickname}
        />
        <SignUpInput
          value={values.email}
          title="이메일"
          errorStr={errors.email}
          InputRightElement={
            <HStack alignItems="center">
              <GText size="big">@snu.ac.kr</GText>
              <GSpace w={10} />
              <GButton
                variant="outlined"
                width="fit"
                isLoading={isEmailSending}
                disabled={values.email.length === 0}
                textProps={{
                  size: 'big',
                }}
                onPress={handleEmailSend}
              >
                {isEmailSent ? '재발송' : '코드 인증'}
              </GButton>
            </HStack>
          }
          onChangeText={handleChange('email')}
        />
        <VStack>
          <SignUpInput
            value={values.emailConfirm}
            title="인증번호"
            marginBottom={14}
            isDisabled={isTokenValid || isTokenConfirmDisabled}
            errorStr={errors.emailConfirm}
            maxLength={6}
            InputRightElement={
              <HStack alignItems="center">
                <TokenTimer
                  endTs={emailTokenExpireTs}
                  isStop={isTokenValid}
                  onTimeEnd={() => setTokenConfirmDisabled(true)}
                />
                {emailTokenExpireTs ? <GSpace w={10} /> : null}
                <GButton
                  variant="outlined"
                  width="fit"
                  isLoading={isTokenValidating}
                  disabled={
                    values.emailConfirm.length === 0 || isTokenConfirmDisabled
                  }
                  textProps={{
                    size: 'big',
                  }}
                  onPress={() =>
                    handleEmailCodeChecking(values.email, values.emailConfirm)
                  }
                >
                  확인
                </GButton>
              </HStack>
            }
            onChangeText={handleChange('emailConfirm')}
          />
        </VStack>
        <VStack mt="15px">
          <GText bold style={{ marginLeft: 11 }}>
            주거래지역
          </GText>
          <HStack width="100%" marginY="5px">
            <GButton
              width="fit"
              variant="outlined"
              size="large"
              textProps={{
                size: 'big',
              }}
              onPress={() => setAddressModalOpen(true)}
            >
              주소 찾기
            </GButton>
            <GSpace w={4} />
            <GInput
              isDisabled
              flex={1}
              width="full"
              placeholder="주소를 찾아주세요"
              value={values.tradingAddress}
            />
          </HStack>
          <GInput
            placeholder="상세주소(선택)"
            value={values.tradingAddressDetail}
            onChangeText={(v) => setFieldValue('tradingAddressDetail', v)}
          />
        </VStack>
        <GSpace h={25} />
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
              setFieldValue('checkbox1IsSelected', !values.checkbox1IsSelected);
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
              setFieldValue('checkbox2IsSelected', !values.checkbox2IsSelected);
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
              setFieldValue('checkbox3IsSelected', !values.checkbox3IsSelected);
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
        <GSpace h={10} />
        <GButton
          size="large"
          disabled={
            Object.keys(errors).length > 0 ||
            !values.isAllCheckboxesSelected ||
            !isTokenValid ||
            values.tradingAddress.length === 0
          }
          isLoading={isSubmitting}
          onPress={() => handleSubmit()}
        >
          가입하기
        </GButton>
      </KeyboardAvoidingView>
      {
        <Modal
          isOpen={isAddressModalOpen}
          onClose={() => setAddressModalOpen(false)}
        >
          <Modal.Content width="100%" pr={0} pl={0}>
            <Modal.CloseButton />
            <Modal.Header pl={5}>주소 찾기</Modal.Header>
            <Modal.Body padding={0} style={{ flex: 1, height: 610 }}>
              <FindAddressWebview onSelect={handleAddressSelect} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      }
    </ScrollView>
  );
};

export default SignUp;
