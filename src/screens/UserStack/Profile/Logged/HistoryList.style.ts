import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const HistoryListStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 80,
    borderColor: palette.borderGray,
    borderWidth: 1,
    backgroundColor: palette.white,
  },
  historyBtn: {
    paddingStart: 20,
  },
  historyBtnText: {
    ...typo.bigTitle,
    fontWeight: 'bold',
  },
});

export default HistoryListStyle;
