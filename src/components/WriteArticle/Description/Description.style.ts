import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

import waStyles from '../WriteArticle.style';

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
    marginTop: 10,
  },
});

export default DescriptionStyle;
