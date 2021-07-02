import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const ProfileStyle = StyleSheet.create({
  headerRightModal: {
    position: 'absolute',
    top: 40,
    width: 169,
    right: 2,
    backgroundColor: 'white',
    height: 127,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.borderGray,
    paddingLeft: 33,
    justifyContent: 'space-evenly',
  },
});

export default ProfileStyle;
