import { StyleSheet } from 'react-native';

const headerStyle = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
});

export default headerStyle;
