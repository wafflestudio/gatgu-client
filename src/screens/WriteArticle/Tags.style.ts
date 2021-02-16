import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const TagsStyle = StyleSheet.create({
  bigContainer: {
    height: 75,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    justifyContent: 'center',
  },

  outer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  inner: {
    borderWidth: 1,
    padding: 10,
  },

  margin: {
    margin: 5,
  },

  label: {
    ...typo.bigTitle,
    marginLeft: 20,
  },

  selected: {
    backgroundColor: 'grey',
  },
});

export default TagsStyle;
