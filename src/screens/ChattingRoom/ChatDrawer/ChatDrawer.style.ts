import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { palette, typo } from '@/styles';

const commonStyle = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: '12.6%',
  },
});

const DrawerStyles = StyleSheet.create({
  drawerInnerWrapper: {
    height: mobile.height - 50,
  },
  pictureContainer: {
    ...commonStyle.container,
    // marginTop: 40,
    height: '20%',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
  },
  userContainer: {
    ...commonStyle.container,
    height: '55%',
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
  },
  optionContainer: {
    ...commonStyle.container,
    height: '25%',
  },
  smallLabelText: {
    ...typo.bigInfo,
  },
  bigLabelText: {
    ...typo.bigTitle,
    fontWeight: 'bold',
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default DrawerStyles;
