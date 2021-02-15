import { StyleSheet } from 'react-native';
import { typo, palette } from '@/styles';

const NotificationStyle = StyleSheet.create({
  Head: {
    ...typo.semiTitle,
    width: '70%',
    flexWrap: 'wrap',
  },
  description: {
    ...typo.info,
    color: palette.gray,
  },
  thunmnail: {
    borderRadius: 32,
  },
  textWrapper: {
    alignItems: 'flex-start',
    marginLeft: '3.6%',
  },
});

export default NotificationStyle;
