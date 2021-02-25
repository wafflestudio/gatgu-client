import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const DrawerStyles = StyleSheet.create({
  upperContainer: {
    paddingLeft: '12.6%',
    paddingTop: '9%',
    paddingBottom: '14.1%',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
  },

  lowerContainer: {
    paddingLeft: '12.6%',
    paddingBottom: '14.1%',
  },

  upperLabelText: {
    ...typo.bigInfo,
    paddingTop: 5,
  },

  lowerLabelText: {
    paddingTop: '9%',
    paddingBottom: '9%',
    ...typo.bigTitle,
    fontWeight: 'bold',
  },

  image: {
    width: 30,
    height: 30,
  },
});

export default DrawerStyles;
