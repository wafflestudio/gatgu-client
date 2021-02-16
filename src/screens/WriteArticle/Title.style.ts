import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

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

  subContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TitleStyle;
