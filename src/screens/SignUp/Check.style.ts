import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const button = {
  width: 22,
  height: 22,
  marginRight: 7,
  borderRadius: 11,
};

const CheckStyle = StyleSheet.create({
  container: {
    marginBottom: 14,
    width: '100%',
    position: 'relative',
  },
  buttonTrue: {
    ...button,
    backgroundColor: palette.blue,
  },
  buttonFalse: {
    ...button,
    backgroundColor: palette.white,
  },
  textWrapper: {
    position: 'absolute',
    right: 0,
    left: 29,
    height: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...typo.boldInfo,
  },
  optional: {
    ...typo.info,
  },
  mandatory: {
    ...typo.boldInfo,
    color: palette.blue,
  },
  contentBtn: {
    ...typo.info,
    color: palette.gray,
    textDecorationLine: 'underline',
  },
});

export default CheckStyle;
