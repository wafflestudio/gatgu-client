import { StyleSheet } from 'react-native';
import { palette } from '@/styles';
const Style = StyleSheet.create({
  tag: {
    backgroundColor: palette.yellow,
    color: palette.white,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Style;
