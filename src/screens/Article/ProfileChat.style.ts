import { StyleSheet } from 'react-native';
import { palette } from '@/styles';
import { pullAll } from 'lodash';

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
    paddingRight: 10,
  },
});

export default ProfileChatStyles;
