import { StyleSheet } from 'react-native';
import { palette, typo } from '@/styles';

const ChatContainerStyle = StyleSheet.create({
  msgContainer: {
    backgroundColor: palette.whiteGray,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  timeText: {
    ...typo.smallText,
    color: palette.gray,
    marginHorizontal: 5,
  },
});

export default ChatContainerStyle;
