import { StyleSheet } from 'react-native';

const infoStyle = StyleSheet.create({
  // container
  container: {
    height: 111,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },

  // profile image
  profileImg: {
    height: 71,
    width: 71,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: 25,
  },

  // content
  content: {
    height: 71,
    width: 120,
    marginRight: 71,
    justifyContent: 'space-between',
  },

  // detail & content common
  detailText: {
    fontSize: 13,
    color: 'gray',
    margin: 2,
  },
  detailNameText: {
    fontSize: 18,
    color: 'black',
    margin: 2,
    fontWeight: 'bold',
  },
  authView: {},
  textWrapper: {
    flexDirection: 'row',
  },
});

export default infoStyle;
