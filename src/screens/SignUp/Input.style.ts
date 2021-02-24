import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const InputStyle = StyleSheet.create({
  container: {
    height: 60,
    position: 'relative',
  },
  inputBox: {
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
  inputButton: {
    width: 80,
    height: 37,
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderColor: palette.blue,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButtonText: {
    ...typo.semiTitle,
    color: palette.blue,
  },
  emailPostfix: {
    ...typo.semiTitle,
    position: 'absolute',
    right: 84,
    bottom: 12,
    width: 83,
  },
});

export default InputStyle;
