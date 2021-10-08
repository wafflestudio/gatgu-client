import { StyleSheet } from 'react-native';

import waStyles from '../WriteArticle.style';

const DescriptionStyle = StyleSheet.create({
  placeHolder: {
    ...waStyles.placeHolder,
    marginTop: 20,
  },

  bigContainer: {
    maxHeight: 500,
    minHeight: 175,
    marginTop: 10,
  },
});

export default DescriptionStyle;
