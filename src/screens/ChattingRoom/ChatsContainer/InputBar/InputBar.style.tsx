import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { palette, typo } from '@/styles';

const commonStyle = StyleSheet.create({
  Icon: {
    width: 44,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginBottom: 12.5,
  },
});

const InputBarStyle = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: palette.white,
    alignItems: 'flex-end',
    maxHeight: 99.5,
  },
  input: {
    ...typo.chat,
    maxHeight: 72,
    borderBottomWidth: 1,
    borderBottomColor: palette.gray,
    width: mobile.width - 150,
    lineHeight: 38,
  },
  inputIcon: {
    ...commonStyle.Icon,
  },
  inputWrapper: {
    justifyContent: 'center',
    marginTop: 11.5,
    marginBottom: 12.5,
  },
});

export default InputBarStyle;
