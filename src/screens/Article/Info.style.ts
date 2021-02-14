import { StyleSheet } from 'react-native';
import { typo, palette } from '@/styles';

const InfoStyles = StyleSheet.create({
  bigContainer: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
  },

  subContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },

  subConNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
    color: palette.gray,
    ...typo.info,
  },
});

export default InfoStyles;
