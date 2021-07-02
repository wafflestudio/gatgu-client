import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { palette } from '@/styles';

const commonStyle = StyleSheet.create({
  Icon: {
    width: 44,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

const InputBarStyle = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: palette.white,
    height: 50,
    padding: 0,
  },
  input: {
    height: 22,
    borderBottomWidth: 1,
    borderBottomColor: palette.gray,
    width: mobile.width - 150,
  },
  inputIcon: {
    ...commonStyle.Icon,
  },
  inputWrapper: {
    height: 50,
    paddingBottom: 8,
    justifyContent: 'center',
  },
});

export default InputBarStyle;
