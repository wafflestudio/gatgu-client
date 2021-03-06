import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const infoStyle = StyleSheet.create({
  // container
  container: {
    height: 111,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    borderColor: palette.borderGray,
    borderWidth: 1,
    backgroundColor: palette.white,
  },

  profileImgOuterWrapper: {
    width: 82,
    height: 82,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 25,
    padding: 5.5,
  },

  profileImgInnerWrapper: {
    width: 71,
    height: 71,
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 25,
  },

  // profile image
  profileImg: {
    height: '100%',
    width: '100%',
  },

  // content
  content: {
    height: 71,
    width: 120,
    marginRight: 71,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // detail & content common
  detailText: {
    fontSize: 13,
    color: 'gray',
    margin: 2,
  },
  detailNameText: {
    fontSize: 18,
    color: 'black',
    margin: 2,
    fontWeight: 'bold',
  },
  authView: {},
  textWrapper: {
    flexDirection: 'row',
  },
});

export default infoStyle;
