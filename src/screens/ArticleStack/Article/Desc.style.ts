import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const DescStyles = StyleSheet.create({
  descText: {
    ...typo.info,
    padding: 15,
  },
  linkBox: {
    borderTopWidth: 1,
    borderColor: palette.borderGray,
  },
});

export default DescStyles;
