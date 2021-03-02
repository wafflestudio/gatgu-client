import { StyleSheet } from 'react-native';
import { palette, typo } from '@/styles';

const TopBubbleStyles = StyleSheet.create({
  box: {
    borderRadius: 7,
    height: 23,
    backgroundColor: palette.gray,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopWidth: 6,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: palette.gray,
    position: 'relative',
  },
  text: {
    ...typo.info,
    color: palette.white,
  },
});

export default TopBubbleStyles;
