import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circleContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circle1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 14,
    height: 14,
    borderWidth: 1,
    margin: 6,
  },
  circle2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 14,
    height: 14,
    backgroundColor: 'black',
    margin: 6,
  },
  photo: {
    width: 350,
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
  descriptionContainer: {
    height: 175,
    borderWidth: 1,
  },
});

export default styles;
