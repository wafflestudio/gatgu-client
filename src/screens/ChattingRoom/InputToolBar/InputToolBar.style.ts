import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  Icon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

const InputToolBarStyle = StyleSheet.create({
  inputContainer: {
    backgroundColor: palette.white,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolder: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E4E9F2',
    paddingHorizontal: 12,
    marginLeft: 0,
  },
  inputIcon: {
    ...commonStyle.Icon,
  },
  actionIcon: {
    ...commonStyle.Icon,
    marginBottom: 0,
  },
});

export default InputToolBarStyle;
