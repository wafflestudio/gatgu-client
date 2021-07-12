import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  logo: {
    marginTop: 133,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 190,
    height: 60,
    marginBottom: 55.6,
  },
  input: {
    width: 262,
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: palette.gray,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  loginBtn: {
    marginTop: 40,
    width: 265,
    height: 41,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: palette.blue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.white,
    fontSize: 18,
  },
  loginBtnText: {
    ...typo.bigTitle,
    color: palette.white,
  },
  signUpBtn: {
    width: 56,
    height: 22,
    fontSize: 15,
    color: palette.gray,
    textDecorationLine: 'underline',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  signUpBtnText: {
    ...typo.semiTitle,
    color: palette.gray,
    textDecorationLine: 'underline',
  },
});

export default LoginStyle;
