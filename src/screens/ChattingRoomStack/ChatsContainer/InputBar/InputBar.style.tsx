import { StyleSheet } from 'react-native';

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
    backgroundColor: palette.white,
    padding: 0,
  },
  inputIcon: {
    ...commonStyle.Icon,
  },
  inputWrapper: {
    width: '88%',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  iconBar: {
    flexDirection: 'row',
    // paddingBottom: 5,
    // borderBottomColor: palette.whiteGray,
    // borderBottomWidth: 1
  },
});

export default InputBarStyle;
