import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.whiteGray,
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    ...typo.bigTitle,
    marginTop: 30,
    height: 27,
    marginBottom: 14,
  },
  confirmBtnConO: {
    height: 46,
    alignItems: 'center',
    borderRadius: 11,
    marginBottom: 62,
    marginTop: 35,
    backgroundColor: palette.blue,
  },
  confirmBtnConX: {
    height: 46,
    alignItems: 'center',
    borderRadius: 11,
    marginBottom: 62,
    marginTop: 35,
    backgroundColor: palette.gray,
  },
  confirmBtnText: {
    ...typo.bigTitle,
    color: palette.white,
    height: 27,
    marginTop: 8,
    marginBottom: 11,
  },
});

export default SignUpStyles;
