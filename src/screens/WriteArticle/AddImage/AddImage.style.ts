import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const AddImageStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
  },

  subContainer: {
    height: '80%',
    justifyContent: 'center',
  },

  plusSignCon: {
    height: '80%',
    width: '80%',
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: palette.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 7,
    marginBottom: 7,
  },

  defaultPhoto: {
    width: 37,
    height: 37,
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  photoContainer: {
    width: 100,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: palette.borderGray,
    marginTop: 7,
    marginBottom: 7,
  },

  buttonContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    // backgroundColor: 'red'
  },

  button: {
    margin: 5,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(0,0,0, 0.75)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddImageStyle;
