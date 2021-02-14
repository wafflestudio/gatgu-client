import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const AppLoadingStyles = StyleSheet.create({
  container: {
    backgroundColor: palette.yellow,
    height: `100%`,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoadingStyles;
