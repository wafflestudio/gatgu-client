import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ArticleShimmerStyles = StyleSheet.create({
  box: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profile: {
    backgroundColor: palette.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ArticleShimmerStyles;
