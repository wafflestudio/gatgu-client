import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const GradeStyle = StyleSheet.create({
  // container
  container: {
    height: 240,
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    backgroundColor: palette.white,
  },

  // header
  header: {
    height: 27,
    marginBottom: 13,
  },
  headerText: {
    ...typo.bigTitle,
    fontWeight: 'bold',
  },

  // graph
  graph: {
    height: 80,
  },
  graphNumbers: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  graphNumber: {
    ...typo.smallText,
    color: palette.gray,
    width: 30,
    textAlign: 'center',
  },
  graphBoxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 17,
  },
  graphBox: {
    borderColor: 'black',
    borderWidth: 1,
    width: 43,
    height: 40,
    marginLeft: 1,
    marginRight: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  graphBoxText: {
    fontSize: 20,
  },
  graphBoxSmallText: {
    fontSize: 15,
  },
  pointBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 0,
    width: 43,
    height: 45,
    marginRight: 1,
    marginLeft: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: 'black',
  },
  pointBoxText: {
    color: 'white',
    fontSize: 20,
  },
  pointArrow: {
    position: 'absolute',
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    bottom: -15,
    borderLeftWidth: 22.5,
    borderRightWidth: 22.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: 15,
    borderTopColor: 'black',
  },
  pointText: {
    fontSize: 15,
    position: 'absolute',
    height: 35,
    bottom: -55,
    textAlign: 'center',
    width: 100,
  },

  // grade
  grade: {
    height: 74,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyElem: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderColor: palette.gray,
    borderWidth: 1,
    marginBottom: 4,
  },
  bodyCircleSelected: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderColor: palette.blue,
    borderWidth: 1,
    marginBottom: 4,
  },
  bodyText: {
    textAlign: 'center',
    ...typo.bigTitle,
    color: palette.gray,
  },
  bodyTextSelected: {
    textAlign: 'center',
    ...typo.bigTitle,
    color: palette.blue,
  },
});

export default GradeStyle;
