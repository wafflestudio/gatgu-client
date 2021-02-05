import { StyleSheet } from 'react-native';

import { flexRow, flexCol } from '@/styles/basic';
import { typo, palette } from '@/styles/theme';

const styles = StyleSheet.create({
  outerBox: {
    height: 150,
    margin: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  articleBox: {
    ...flexCol,
    flex: 2,

    marginLeft: 30,
    justifyContent: 'flex-start',
  },
  Head: {
    ...typo.semiTitle,
    color: palette.dark,
    marginBottom: 15,
    marginTop: 10,
  },
  description: {
    ...typo.description,
    color: palette.gray,
  },
  subArticle3: {
    ...flexRow,
    marginVertical: 5,
    flex: 1,
  },
  innerBox: {
    ...flexRow,
    height: '100%',
  },
});

export default styles;
