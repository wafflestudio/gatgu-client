import { StyleSheet } from 'react-native';

const WriteArticleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  photo: {
    width: '100%',
    height: 250,
  },

  recruitHalfContainer: {
    borderWidth: 1,
    height: 60,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  description: {
    marginTop: 10,
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
  },

  subContainer: {
    height: 60,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bigContainer: {
    height: 175,
    borderWidth: 1,
  },

  text: {
    flex: 1,
    flexWrap: 'wrap',
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

  selected: {
    backgroundColor: 'grey',
  },
});

export default WriteArticleStyles;
