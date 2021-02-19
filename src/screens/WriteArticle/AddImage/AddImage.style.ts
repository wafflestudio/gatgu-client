import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const AddImageStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderBottomColor: palette.borderGray,
    borderBottomWidth: 1,
    justifyContent: 'center',
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
    width: '25%',
    height: '80%',
    marginLeft: 20,
    marginTop: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: palette.borderGray,
  },
});

export default AddImageStyle;
