import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  chatBox: {
    borderRadius: 11,
    maxWidth: 246,
    minWidth: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

const MessageStyle = StyleSheet.create({
  opponentChatBox: {
    ...commonStyle.chatBox,
    backgroundColor: palette.white,
  },
  myChatBox: {
    ...commonStyle.chatBox,
    backgroundColor: palette.yellow,
  },
  msgContainer: {
    backgroundColor: palette.whiteGray,
  },
  chatText: {
    ...typo.smallText,
    color: palette.dark,
    fontSize: 15,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 10,
  },
  systemText: {
    color: palette.white,
    fontSize: 10,
  },
  systemWrapper: {
    backgroundColor: palette.dark,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 9,
  },
  nameText: {
    color: palette.dark,
    fontSize: 12,
  },
  avartar: { width: 31, height: 31, marginLeft: 20, marginTop: 5 },
  messageImage: {
    width: 112,
    height: 208,
  },
  bubbleContainer: {},
});

export default MessageStyle;
