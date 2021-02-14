import { StyleSheet } from 'react-native';
import { palette } from '@/styles';

const ProfileChatStyles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 80,
  },

  profileImg: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    marginRight: 12,
    marginLeft: 15,
  },

  userContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ProfileChatStyles;
