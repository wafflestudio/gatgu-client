import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const SystemStyle = StyleSheet.create({
  systemText: {
    color: palette.white,
    fontSize: 10,
    lineHeight: 18,
  },
  systemWrapper: { alignItems: 'center' },
  box: {
    backgroundColor: palette.dark,
    paddingHorizontal: 10,
    borderRadius: 9,
    height: 18,
    marginTop: 24,
    alignItems: 'center',
  },
  marginBottom24: {
    marginBottom: 24,
  },
});

export default SystemStyle;
