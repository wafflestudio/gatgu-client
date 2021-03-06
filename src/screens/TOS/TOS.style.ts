import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const TOSstyle = StyleSheet.create({
  container: {
    backgroundColor: palette.whiteGray,
    position: 'relative',
    paddingLeft: 40,
    paddingRight: 40,
  },
  titleView: {
    height: 27,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
  titleText: {
    ...typo.bigTitle,
    marginRight: 7,
  },
  titleOptional: {
    ...typo.bigTitle,
    color: palette.gray,
  },
  titleMandatory: {
    ...typo.bigTitle,
    color: palette.blue,
  },
  contentView: {
    height: 513,
    borderRadius: 12,
    backgroundColor: palette.white,
    padding: 12,
    borderColor: palette.borderGray,
    borderWidth: 1,
  },
  contentText: {
    ...typo.smallText,
  },
  confirmBtn: {
    height: 46,
    borderRadius: 12,
    backgroundColor: palette.blue,
    marginBottom: 57,
    marginTop: 50,
    alignItems: 'center',
  },
  confirmBtnText: {
    ...typo.bigTitle,
    color: palette.white,
    marginTop: 8,
  },
});

export default TOSstyle;
