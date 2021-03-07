import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ForceStyle = StyleSheet.create({
  container: {
    height: 87,
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    backgroundColor: palette.white,
  },

  // header
  header: {
    height: 27,
    marginBottom: 7,
  },
  headerText: {
    ...typo.bigTitle,
  },

  // body
  bodyView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
  bodyText: {
    ...typo.semiTitle,
  },

  bodyElem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyIcon: {
    width: 16,
    height: 16,
  },
});

export default ForceStyle;
