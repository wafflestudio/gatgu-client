import { typo, palette } from '@/styles';
import { StyleSheet } from 'react-native';

const DescriptionStyle = StyleSheet.create({
  text: {
    ...typo.semiTitle,
    flexWrap: 'wrap',
    color: 'black',
    padding: 20,
    paddingTop: 20,
    width: '100%',
  },

  placeHolder: {
    ...typo.semiTitle,
    color: palette.gray,
    marginLeft: 20,
    marginTop: 20,
  },

  bigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    maxHeight: 500,
  },
});

export default DescriptionStyle;
