import { StyleSheet } from 'react-native';

import { palette } from '@/styles';
import { flexRow } from '@/styles/wrapper';

const SearchBarStyles = StyleSheet.create({
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

export default SearchBarStyles;
