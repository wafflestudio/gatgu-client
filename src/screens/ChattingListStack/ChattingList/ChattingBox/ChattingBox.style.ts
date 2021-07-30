import { StyleSheet } from 'react-native';

import { typo, palette } from '@/styles';

const ChattingListStyles = StyleSheet.create({
  Head: {
    ...typo.semiTitle,
    flexWrap: 'wrap',
    height: 22,
  },
  Box: {
    width: '70%',
  },
  description: {
    ...typo.info,
    color: palette.gray,
    flexWrap: 'wrap',
    height: 22,
  },
  thumbnail: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  textWrapper: {
    flexDirection: 'row',
    width: '103%',
    justifyContent: 'space-between',
  },
  timeWrapper: {
    ...typo.info,
    color: palette.gray,
  },
  container: {
    flex: 1,
    marginLeft: '3.6%',
  },
});

export default ChattingListStyles;
