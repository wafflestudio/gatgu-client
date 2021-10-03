import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const HistoryListStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 80,
    paddingLeft: 20,
    borderColor: palette.borderGray,
    borderWidth: 1,
    backgroundColor: palette.white,
  },
});

export default HistoryListStyle;
