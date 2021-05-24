import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const TagsStyle = StyleSheet.create({
  bigContainer: {
    height: 75,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    justifyContent: 'center',
  },

  labelContainer: {
    height: 50,
  },

  tagContainer: {
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },

  tagText: {
    ...typo.semiTitle,
  },

  label: {
    ...typo.bigTitle,
    marginLeft: 20,
  },

  selected: {
    backgroundColor: palette.gray,
  },
});

export default TagsStyle;
