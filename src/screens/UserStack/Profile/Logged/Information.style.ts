import { StyleSheet } from 'react-native';

import { palette } from '@/styles';

const infoStyle = StyleSheet.create({
  // container
  container: {
    width: '100%',
    height: 111,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: palette.borderGray,
    borderBottomWidth: 1,
    backgroundColor: palette.white,
    overflow: 'hidden',
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

  // detail & content common
  detailText: {
    fontSize: 13,
    color: 'gray',
  },
  detailNameText: {
    fontSize: 18,
    color: 'black',
    margin: 2,
    fontWeight: 'bold',
    overflow: 'hidden',
    flex: 1,
  },
});

export default infoStyle;
