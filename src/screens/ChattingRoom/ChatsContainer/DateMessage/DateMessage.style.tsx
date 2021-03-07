import { StyleSheet } from 'react-native';
import { palette } from '@/styles';

const DateMsgStyle = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
  },
  middleLine: {
    borderBottomColor: palette.gray,
    borderBottomWidth: 1,
    transform: [{ translateY: -10 }],
  },
});

export default DateMsgStyle;
