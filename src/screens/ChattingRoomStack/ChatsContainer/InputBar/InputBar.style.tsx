import { StyleSheet } from 'react-native';

import { margin } from 'styled-system';

import { mobile } from '@/helpers/mobile';
import { palette, typo } from '@/styles';

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
    // height: 50,
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
    height: 200,
    paddingBottom: 8,
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  modalBox: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingLeft: 3,
    paddingRight: 5,
    paddingTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: palette.borderGray,
  },
  button: {
    backgroundColor: palette.blue,
  },
});

export default InputBarStyle;
