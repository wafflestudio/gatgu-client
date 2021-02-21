import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const DrawerStyles = StyleSheet.create({
  container: {
    backgroundColor: palette.yellow,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLogo: {
    height: 132.13,
    width: 132.13,
    marginBottom: 43.43,
  },
  subLogo: {
    height: 60,
    width: 190,
  },
});

export default DrawerStyles;
