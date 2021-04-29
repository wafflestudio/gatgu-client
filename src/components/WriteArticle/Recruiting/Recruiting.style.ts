import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const TitleStyle = StyleSheet.create({
  bigContainer: {
    height: 130,
  },

  switchContainer: {
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 10,
    height: 60,
  },

  selectedBox: {
    borderColor: palette.borderGray,
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
  },
});

export default TitleStyle;

export const switchSelector = {
  initial: 0,
  height: 30,
  backgroundColor: palette.whiteGray,
  buttonColor: palette.white,
  selectedColor: 'black',
  borderRadius: 7,
  selectedTextContainerStyle: TitleStyle.selectedBox,
  textStyle: { ...typo.semiTitle },
  selectedTextStyle: { ...typo.semiTitle },
  style: { width: '90%' },
};
