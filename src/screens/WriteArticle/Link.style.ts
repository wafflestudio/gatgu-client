import { typo, palette } from '@/styles';
import { StyleSheet } from 'react-native';

const LinkStyle = StyleSheet.create({
  text: {
    ...typo.semiTitle,
    flexWrap: 'wrap',
    color: 'black',
    padding: 20,
    paddingTop: 20,
  },

  placeHolder: {
    ...typo.semiTitle,
    color: palette.gray,
    marginLeft: 20,
  },

  subContainer: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    maxHeight: 100,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LinkStyle;
