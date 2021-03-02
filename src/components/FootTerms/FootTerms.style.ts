import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const FootTermsStyle = StyleSheet.create({
  // 약관, 개인정보 처리방침
  smalls: {
    flexDirection: 'row',
  },
  smallBtn: {
    marginRight: 11,
    marginLeft: 11,
  },
  smallBtnText: {
    ...typo.smallText,
    color: palette.gray,
    textDecorationLine: 'underline',
  },
  smallText: {
    ...typo.smallText,
    color: palette.gray,
  },
});

export default FootTermsStyle;
