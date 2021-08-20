import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const commonStyle = StyleSheet.create({
  chatBox: {
    borderRadius: 11,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginTop: 5,
    maxWidth: 280,
  },
});

const BubbleStyle = StyleSheet.create({
  leftBubble: {
    ...commonStyle.chatBox,
    backgroundColor: palette.white,
  },
  rightBubble: {
    ...commonStyle.chatBox,
    backgroundColor: palette.yellow,
  },
  chatText: {
    color: palette.dark,
    fontSize: 15,
    lineHeight: 22,
  },
});

export default BubbleStyle;
