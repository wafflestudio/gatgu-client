import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const DescStyles = StyleSheet.create({
  descText: {
    ...typo.semiTitle,
    padding: 20,
  },
  linkBox: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: palette.borderGray,
  },
});

export default DescStyles;
