import { StyleSheet } from 'react-native';

import { mobile } from '@/helpers/mobile';
import { palette, typo } from '@/styles';
import { $header_height, $input_height } from '@/styles/size';

const ChatContainerStyle = StyleSheet.create({
  msgContainer: {
    backgroundColor: palette.whiteGray,
    paddingHorizontal: 20,
    height: mobile.height - $header_height - $input_height,
  },
  timeText: {
    ...typo.smallText,
    color: palette.gray,
    marginHorizontal: 5,
  },
});

export default ChatContainerStyle;
