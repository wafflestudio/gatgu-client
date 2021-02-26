import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const UnLoggedStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 58,
  },
  title: {
    ...typo.bigTitle,
    width: 264,
    textAlign: 'center',
  },
  info: {
    ...typo.info,
    marginTop: 10,
    marginBottom: 30,
    color: palette.gray,
    width: 290,
    textAlign: 'center',
  },
  image: {
    width: 264,
    height: 151,
    marginBottom: 9,
  },
  loginBtn: {
    marginTop: 27,
    width: 263,
    height: 46,
    backgroundColor: palette.blue,
    paddingTop: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  loginBtnText: {
    ...typo.bigTitle,
    color: palette.white,
  },
  signUpBtn: {
    marginTop: 15,
    marginBottom: 38,
  },
  signUpBtnText: {
    ...typo.info,
    color: palette.gray,
    textDecorationLine: 'underline',
  },
  // 약관, 개인정보 처리방침
  smalls: {
    flexDirection: 'row',
  },
  smallBtn: {
    marginRight: 11,
    marginLeft: 11,
  },
  smallBtnText: {
    ...typo.smallText,
    color: palette.gray,
    textDecorationLine: 'underline',
  },
  smallText: {
    ...typo.smallText,
    color: palette.gray,
  },
});

export default UnLoggedStyle;
