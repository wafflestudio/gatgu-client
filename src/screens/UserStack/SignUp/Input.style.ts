import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const InputStyle = StyleSheet.create({
  container: {
    height: 60,
    position: 'relative',
  },
  warnText: {
    ...typo.smallText,
    color: palette.warnRed,
    paddingLeft: 11,
  },
  title: {
    ...typo.boldInfo,
    color: palette.dark,
    fontWeight: 'bold',
    paddingLeft: 11,
  },
  titleBox: {
    flexDirection: 'row',
  },
});

export default InputStyle;
