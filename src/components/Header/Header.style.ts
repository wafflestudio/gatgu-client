import { StyleSheet, Platform, StatusBar } from 'react-native';

import { palette, typo } from '@/styles';

const commonStyle = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
  },
});

const HeaderStyles = StyleSheet.create({
  header: {
    height: 59,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    justifyContent: 'space-between',
  },
  basicTitleText: {
    ...typo.semiTitle,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  SafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  leftButton: {
    ...commonStyle.button,
    marginLeft: 13,
    justifyContent: 'center',
  },
  rightButton: {
    ...commonStyle.button,
    marginRight: 13,
    justifyContent: 'center',
  },
});

export default HeaderStyles;
