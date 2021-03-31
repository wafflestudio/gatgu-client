import { Platform, StatusBar, StyleSheet } from 'react-native';

import { palette } from '@/styles';

const Styles = StyleSheet.create({
  keyboardAvoidView: { flex: 1, backgroundColor: palette.white },
});

export default Styles;

if (Platform.OS) {
  console.log(StatusBar.currentHeight);
}
