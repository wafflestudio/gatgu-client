import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

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
  },
});

export default HistoryListStyle;