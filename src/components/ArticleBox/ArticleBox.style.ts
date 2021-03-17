import { StyleSheet } from 'react-native';

import { flexRow } from '@/styles/wrapper';
import { typo, palette } from '@/styles';
import {
  $postBox_pad_horizontal,
  $thumnail_size,
  $thumnail_margin_right,
} from '@/styles/size';
import { mobile } from '@/helpers/mobile';

const PostBoxStyles = StyleSheet.create({
  articleBox: {
    width:
      mobile.width -
      $thumnail_size -
      2 * $postBox_pad_horizontal -
      $thumnail_margin_right,
    flexDirection: 'column',
    marginLeft: '5.3%',
    justifyContent: 'flex-start',
    height: '100%',
  },
  Head: {
    ...typo.semiTitle,
    color: palette.dark,
  },
  description: {
    ...typo.info,
    color: palette.gray,
  },
  postBox: {
    ...flexRow,
    height: 142,
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  infoWrapper: {
    ...flexRow,
    height: 16,
    marginTop: 11,
    flexWrap: 'wrap',
  },
  goalWrapper: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
  },
});

export default PostBoxStyles;
