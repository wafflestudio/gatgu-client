import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ProfileModifyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  // image
  imgContainer: {
    marginTop: 47,
    marginBottom: 19,
    height: 121,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgWrap: {
    width: 121,
    height: 121,
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  imgPickBtn: {
    position: 'absolute',
    width: 44,
    height: 44,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderColor: palette.borderGray,
    borderWidth: 1,
  },
  // nickname
  nickContainer: {
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
  },
  nickInput: {
    width: '100%',
    height: '90%',
    borderColor: palette.borderGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  nickText: {
    marginLeft: 11,
    marginTop: 5,
    ...typo.info,
    color: palette.warnRed,
  },
});

export default ProfileModifyStyles;
