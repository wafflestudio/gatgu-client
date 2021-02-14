import { StyleSheet } from 'react-native';
import { palette, typo } from '@/styles/theme';

const styles = StyleSheet.create({
  bigContainer: {
    borderBottomWidth: 1,
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

  subText: {
    color: palette.gray,
    ...typo.info,
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
    color: palette.gray,
    ...typo.info,
  },
});

export default styles;
