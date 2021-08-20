import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const commonStyle = StyleSheet.create({
  container: {
    marginHorizontal: 2.5,
  },
});

const ChatBoxStyle = StyleSheet.create({
  leftContinaer: {
    ...commonStyle.container,
    alignItems: 'flex-start',
  },
  rightContainer: {
    ...commonStyle.container,
    alignItems: 'flex-end',
  },
  messageImage: {
    height: 112,
    width: 208,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginTop: 5,
  },
  avatar: {
    width: 31,
    height: 31,
    marginTop: 5,
    borderRadius: 15.5,
    marginRight: 10,
    // borderWidth: 1,
    // borderColor: palette.borderGray,
  },
  nameText: {
    ...typo.info,
    color: palette.dark,
  },
  row: {
    flexDirection: 'row',
  },
  row_reverse: {
    flexDirection: 'row-reverse',
  },
  marginTop10: { marginTop: 10 },
});

export default ChatBoxStyle;
