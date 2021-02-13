import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  header: {
    height: 75,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
