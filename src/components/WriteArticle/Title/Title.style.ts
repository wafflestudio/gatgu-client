import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const TitleStyle = StyleSheet.create({
  text: {
    ...typo.bigTitle,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
    marginLeft: 20,
  },

  placeHolder: {
    ...typo.bigTitle,
    color: palette.gray,
    marginLeft: 20,
  },
});

export default TitleStyle;
