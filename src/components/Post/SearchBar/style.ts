import { StyleSheet } from 'react-native';

import { palette } from '@/styles/theme';
import { flexRow } from '@/styles/basic';

const styles = StyleSheet.create({
  outerBox: {
    ...flexRow,
    backgroundColor: palette.white,
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: { paddingLeft: 10 },
});

export default styles;
