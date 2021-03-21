import { StyleSheet } from 'react-native';

import { palette } from '@/styles/palette';

const InfoContainerStyle = StyleSheet.create({
  container: {
    height: 96,
    width: '100%',
    paddingTop: 17,
    paddingBottom: 15,
    paddingHorizontal: '5.3%',
    borderBottomWidth: 1,
    borderColor: palette.borderGray,
    backgroundColor: palette.white,
    flexDirection: 'row',
  },
});

export default InfoContainerStyle;
