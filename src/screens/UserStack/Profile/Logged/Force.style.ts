import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ForceStyle = StyleSheet.create({
  container: {
    height: 97,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: palette.white,
  },

  // header
  header: {
    height: 27,
    marginBottom: 7,
  },
  headerText: {
    ...typo.bigTitle,
    fontWeight: 'bold',
    color: palette.dark,
  },

  // body
  bodyView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
  },
  bodyText: {
    ...typo.semiTitle,
    color: palette.dark,
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
