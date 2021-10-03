import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const AddImageStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
  },

  subContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
  },

  plusSignCon: {
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: palette.borderGray,
    backgroundColor: palette.whiteGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 7,
    marginBottom: 7,
  },

  defaultPhoto: {
    width: 37,
    height: 37,
  },

  thumbnail: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: palette.dark,
  },

  thumbnailContainer: {
    width: 107,
    height: 70,
    borderWidth: 1,
    marginLeft: 16,
    borderColor: palette.borderGray,
    marginTop: 8,
    marginRight: 4,
    marginBottom: 8,
    alignSelf: 'center',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  photoContainer: {
    width: 100,
    borderWidth: 1,
    marginLeft: 16,
    borderColor: palette.borderGray,
    marginTop: 7,
    marginRight: 4,
    marginBottom: 7,
    alignSelf: 'center',
  },

  loading: {
    width: 100,
    height: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
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
