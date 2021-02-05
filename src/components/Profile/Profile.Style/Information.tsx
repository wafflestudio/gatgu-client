import { StyleSheet } from 'react-native';

const infoStyle = StyleSheet.create({
  container: {
    height: 170,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: 25,
  },
  detail: {
    height: 90,
    width: 100,
    justifyContent: 'space-between',
  },
  content: {
    height: 90,
    width: 120,
    justifyContent: 'space-between',
  },
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
