import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { palette, typo } from '@/styles';

const commonStyle = StyleSheet.create({
  container: {
    paddingLeft: '12.6%',
  },
});

const DrawerStyles = StyleSheet.create({
  drawerInnerWrapper: {
    height: mobile.height - 50,
  },
  pictureContainer: {
    ...commonStyle.container,
    marginBottom: 10,
    paddingTop: 19,
    height: '21%',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
  },
  userContainer: {
    ...commonStyle.container,
    paddingTop: 19,
    height: '55%',
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  optionContainer: {
    paddingTop: 25,
    height: '24%',
    alignItems: 'center',
  },
  smallLabelText: {
    ...typo.bigInfo,
  },
  bigLabelText: {
    ...typo.bigTitle,
    fontWeight: 'bold',
    marginBottom: 19,
  },
  image: {
    width: 101,
    height: 76,
    marginRight: 10,
  },
  profileBox: {
    marginBottom: 20,
    flexDirection: 'row',
    width: '95%',
    marginRight: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  checkBoxWrapper: {
    alignSelf: 'flex-end',
  },
  priceText: {
    color: palette.gray,
    fontSize: 11,
  },
  infoWrapper: {
    right: 0,
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default DrawerStyles;
