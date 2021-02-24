import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const InputStyle = StyleSheet.create({
  container: {
    height: 60,
  },
  InputBox: {
    ...typo.semiTitle,
    height: 45,
    backgroundColor: palette.white,
    borderColor: palette.borderGray,
    borderWidth: 1,
    paddingLeft: 11,
    paddingRight: 11,
    alignItems: 'center',
    borderRadius: 11,
  },
  warnText: {
    ...typo.warningText,
    paddingLeft: 11,
  },
  validText: {
    ...typo.warningText,
    color: palette.blue,
    paddingLeft: 11,
  },
});

export default InputStyle;
