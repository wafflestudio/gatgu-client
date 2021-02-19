import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';
import { flexRow } from '@/styles/wrapper';

const SearchBarStyles = StyleSheet.create({
  outerBox: {
    ...flexRow,
    backgroundColor: palette.whiteGray,
    minWidth: '100%',
    width: '100%',
    height: 37,
    alignItems: 'center',
  },
  searchIcon: { paddingLeft: 10 },
  text: {
    ...typo.semiTitle,
    fontSize: 18,
    color: palette.dark,
    height: 37,
    paddingLeft: 10,
    width: '100%',
  },
  placeholder: {
    color: palette.gray,
  },
  searchText: {
    color: palette.dark,
  },
});

export default SearchBarStyles;
