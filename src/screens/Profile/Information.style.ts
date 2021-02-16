import { StyleSheet } from 'react-native';

const infoStyle = StyleSheet.create({
  // container
  container: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },

  // profile image
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: 25,
  },

  // detail
  detail: {
    height: 90,
    width: 100,
    justifyContent: 'space-between',
  },

  // content
  content: {
    height: 90,
    width: 120,
    justifyContent: 'space-between',
  },

  // detail & content common
  detailText: {
    fontSize: 20,
    color: 'gray',
    margin: 2,
  },
  authView: {},
  textWrapper: {
    flexDirection: 'row',
  },
});

export default infoStyle;
