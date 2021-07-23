import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ArticleHeaderStyle = StyleSheet.create({
  box: {
    borderTopColor: palette.borderGray,
    borderBottomColor: palette.borderGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 20,
  },
  infoText: {
    color: palette.gray,
    ...typo.info,
  },
});

export default ArticleHeaderStyle;
