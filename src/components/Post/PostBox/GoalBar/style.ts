import { StyleSheet } from 'react-native';
import { typo, palette } from '@/styles/theme';

const styles = StyleSheet.create({
  wrapper: {
    width: '53.3%',
    position: 'absolute',
    top: 79,
  },
  goalBox: {
    width: '100%',
    borderRadius: 7,
    height: 14,
    backgroundColor: palette.whiteGray,
  },
  percentBox: {
    borderRadius: 7,
    height: 14,
  },
  yellow: {
    backgroundColor: palette.yellow,
  },
  blue: {
    backgroundColor: palette.blue,
  },
  goal: {
    ...typo.info,
    color: palette.gray,
    alignSelf: 'flex-end',
  },
});

export default styles;