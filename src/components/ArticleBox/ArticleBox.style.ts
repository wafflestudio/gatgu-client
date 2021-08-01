import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { typo, palette } from '@/styles';

// percentage is not applied in Flatlist
const BOX_HEIGHT = 142;
const IMAGE_RIGHT_MARGIN = 20;
const ARTICLE_BOX_HORIZONTAL_PADDING = 20;

const PostBoxStyles = StyleSheet.create({
  articleBox: {
    width: mobile.width - 142 - 2 * ARTICLE_BOX_HORIZONTAL_PADDING,
    marginLeft: IMAGE_RIGHT_MARGIN,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Head: {
    ...typo.semiTitle,
    color: palette.dark,
  },
  description: {
    ...typo.info,
    color: palette.gray,
  },
  priceText: {
    ...typo.info,
    color: palette.dark,
  },
  postBox: {
    flexDirection: 'row',
    width: mobile.width,
    height: BOX_HEIGHT,
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: ARTICLE_BOX_HORIZONTAL_PADDING,
    backgroundColor: palette.white,
  },
  infoWrapper: {
    height: 16,
    marginTop: 11,
    flexWrap: 'wrap',
  },
});

export default PostBoxStyles;
