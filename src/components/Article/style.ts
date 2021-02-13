import { PlatformColor, StyleSheet } from 'react-native';
import { palette, typo } from '@/styles/theme';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 283,
  },
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
    // need advice: how to make float at right-end of screen
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
  bigContainer: {
    borderBottomWidth: 1,
  },
  userContainer: {
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  subContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  subConNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  subText: {
    color: palette.gray,
    ...typo.info,
  },
  label: {
    marginRight: 10,
    marginLeft: 10,
    color: palette.gray,
    ...typo.info,
  },
  descText: {
    ...typo.info,
    padding: 15,
  },
});

export default styles;
