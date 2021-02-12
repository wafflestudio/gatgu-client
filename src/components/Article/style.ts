import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  profileImg: {
    width: 50,
    height: 50,
  },
  subContainer: {
    height: 60,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 80,
  },
  chattingButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
  },
});

export default styles;
