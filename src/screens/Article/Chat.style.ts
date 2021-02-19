import { StyleSheet } from 'react-native';
import { palette } from '@/styles';

const ChatStyles = StyleSheet.create({
  chattingButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: palette.blue,
    borderColor: palette.blue,
  },

  chattingText: {
    color: palette.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  userContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default ChatStyles;
