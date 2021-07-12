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
  thunmnail: {
    borderRadius: 32,
  },
  textWrapper: {
    alignItems: 'flex-start',
    marginLeft: '3.6%',
  },
  writerTimeWrapper: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
});

export default ChattingListStyles;
