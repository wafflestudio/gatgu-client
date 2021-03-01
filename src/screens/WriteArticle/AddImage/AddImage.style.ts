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

  subContainer: { height: '70%' },

  plusSignCon: {
    height: '100%',
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: palette.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
  },

  defaultPhoto: {
    width: 50,
    height: 50,
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
  },
});

export default AddImageStyle;
