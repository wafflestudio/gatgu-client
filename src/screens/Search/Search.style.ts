import { StyleSheet } from 'react-native';
import { typo, palette } from '@/styles';

const SearchStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  head: {
    ...typo.bigTitle,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagBox: {
    borderRadius: 15,
    minWidth: 54,
    height: 28,
    borderColor: palette.borderGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 5,
    paddingHorizontal: 13,
    paddingVertical: 3,
  },
  tagText: {
    ...typo.info,
    color: palette.whiteGray,
  },
  sectionWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: palette.borderGray,
    width: '100%',
  },
  searchWrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: palette.borderGray,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
});

export default SearchStyles;
