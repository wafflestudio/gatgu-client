import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const ProfileChatStyles = StyleSheet.create({
  userContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  profileContainer: {
    paddingRight: 80,
    marginLeft: 15,
  },
});

export default ProfileChatStyles;
