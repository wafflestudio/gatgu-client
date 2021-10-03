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
    borderRadius: 100,
    borderWidth: 1,
    borderColor: palette.borderGray,
  },
  imgCont: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderColor: palette.borderGray,
    borderWidth: 1,
  },

  imgPickBtn: {
    width: 44,
    height: 44,
  },
  // inputs
  inputContainer: {
    height: 45,
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {
    width: '100%',
    height: '90%',
    borderColor: palette.borderGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 8,
  },
  text: {
    marginLeft: 11,
    marginTop: 5,
    ...typo.info,
    color: palette.warnRed,
    marginBottom: 8,
  },
});

export default ProfileModifyStyles;
