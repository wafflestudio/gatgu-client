import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const SystemStyle = StyleSheet.create({
  systemText: {
    color: palette.white,
    fontSize: 15,
    lineHeight: 18,
  },
  systemWrapper: { alignItems: 'center' },
  box: {
    backgroundColor: palette.dark,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 9,
    // height: 18,
    marginTop: 24,
    alignItems: 'center',
  },
  marginBottom24: {
    marginBottom: 24,
  },
});

export default SystemStyle;
