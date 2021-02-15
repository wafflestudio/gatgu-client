import { StyleSheet } from 'react-native';

const TagsStyle = StyleSheet.create({
  bigContainer: {
    height: 175,
    borderWidth: 1,
  },

  outer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  inner: {
    borderWidth: 1,
    padding: 10,
  },

  padding: {
    marginTop: 7,
    marginBottom: 6,
  },

  margin: {
    margin: 5,
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
  },

  selected: {
    backgroundColor: 'grey',
  },
});

export default TagsStyle;
