import { StyleSheet } from 'react-native';
import { palette } from '@/styles';

const TagListStyle = StyleSheet.create({
  outerWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: palette.borderGray,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default TagListStyle;
