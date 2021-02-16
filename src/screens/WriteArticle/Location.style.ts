import { typo, palette } from '@/styles';
import { StyleSheet } from 'react-native';

const LocationStyle = StyleSheet.create({
  text: {
    ...typo.semiTitle,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
    marginLeft: 20,
  },

  placeHolder: {
    ...typo.semiTitle,
    color: palette.gray,
    marginLeft: 20,
  },

  subContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LocationStyle;
