import { StyleSheet } from 'react-native';
import { palette } from '@/styles';

const ProfileStyles = StyleSheet.create({
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
});

export default ProfileStyles;
