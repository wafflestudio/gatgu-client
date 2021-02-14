import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const AppLoadingStyles = StyleSheet.create({
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
    backgroundColor: 'black',
  },
  subLogo: {
    height: 60,
    width: 190,
    backgroundColor: 'black',
  },
});

export default AppLoadingStyles;
