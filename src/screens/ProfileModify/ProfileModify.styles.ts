const ProfileModifyStyles = {
  container: {
    flex: 1,
  },
  // image
  imgContainer: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgWrap: {
    width: 160,
    height: 160,
  },
  profileImg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
  },
  imgPickBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: -10,
    bottom: -10,
    borderRadius: 30,
    backgroundColor: 'yellow',
  },
  // nickname
  nickContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  nickInput: {
    width: '100%',
    height: '90%',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 30,
  },
};

export default ProfileModifyStyles;
