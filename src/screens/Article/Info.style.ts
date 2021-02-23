import { StyleSheet } from 'react-native';
import { typo, palette } from '@/styles';

const InfoStyles = StyleSheet.create({
  subContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },

  subConNoBorder: {
    flexDirection: 'row',
    padding: 5,
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
    color: palette.gray,
    ...typo.info,
  },

  goalWrapper: {
    alignItems: 'center',
    width: '79%',
    paddingTop: 4,
  },
});

export default InfoStyles;
