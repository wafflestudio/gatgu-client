import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

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
    flexDirection: 'row',
  },
  titleContainer: {
    marginBottom: 27,
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonTrue: {
    ...button,
    backgroundColor: palette.blue,
  },
  buttonFalse: {
    backgroundColor: palette.white,
    borderColor: palette.gray,
    borderWidth: 1,
  },
  textWrapper: {
    height: 19,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  title: {
    ...typo.boldInfo,
  },
  allTitle: {
    ...typo.boldInfo,
    textDecorationLine: 'underline',
    marginTop: -10,
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
