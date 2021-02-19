import { typo, palette } from '@/styles';
import waStyles from './WriteArticle.style';
import { StyleSheet } from 'react-native';

const DescriptionStyle = StyleSheet.create({
  placeHolder: {
    ...waStyles.placeHolder,
    marginTop: 20,
  },

  bigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    maxHeight: 500,
    minHeight: 175,
  },
});

export default DescriptionStyle;
