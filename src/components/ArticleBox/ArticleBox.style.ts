import { StyleSheet } from 'react-native';

import { flexRow, flexCol } from '@/styles/wrapper';
import { typo, palette } from '@/styles';

const PostBoxStyles = StyleSheet.create({
  articleBox: {
    ...flexCol,
    marginLeft: '5.3%',
    justifyContent: 'flex-start',
  },
  Head: {
    ...typo.semiTitle,
    color: palette.dark,
    width: 200,
    flexWrap: 'wrap',
  },
  description: {
    ...typo.info,
    color: palette.gray,
  },
  postBox: {
    ...flexRow,
    marginRight: '7.9%',
    height: 141,
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  infoWrapper: {
    ...flexRow,
    height: 19,
    marginTop: '1.6%',
  },
  goalWrapper: {
    position: 'absolute',
    top: 79,
    width: '53.5%',
  },
});

export default PostBoxStyles;
