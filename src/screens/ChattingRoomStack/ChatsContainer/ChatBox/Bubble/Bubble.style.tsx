import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const commonStyle = StyleSheet.create({
  chatBox: {
    borderRadius: 11,
    paddingVertical: 7,
    paddingHorizontal: 10,
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
    fontSize: 16,
    lineHeight: 22,
  },
});

export default BubbleStyle;
