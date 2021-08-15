import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { typo, palette } from '@/styles';

// percentage is not applied in Flatlist
const BOX_HEIGHT = 142;
const IMAGE_RIGHT_MARGIN = 20;
const ARTICLE_BOX_HORIZONTAL_PADDING = 20;

const PostBoxStyles = StyleSheet.create({
  articleBox: {
    flex: 1,
    marginLeft: IMAGE_RIGHT_MARGIN,
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  Head: {
    ...typo.semiTitle,
    color: palette.dark,
  },
  description: {
    ...typo.info,
    color: palette.gray,
    minHeight: 40,
    flex: 1,
    width: '100%',
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
    marginTop: 11,
    flexWrap: 'wrap',
  },
});

export default PostBoxStyles;
