import { StyleSheet } from 'react-native';

const GradeStyle = StyleSheet.create({
  // container
  container: {
    borderWidth: 1,
    borderColor: 'black',
    height: 320,
    padding: 20,
  },

  // header
  header: {
    height: 25,
    paddingLeft: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
  },

  // graph
  graph: {
    height: 135,
  },
  graphNumbers: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  graphNumber: {
    width: 45,
    textAlign: 'center',
  },
  graphBoxes: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  graphBox: {
    borderColor: 'black',
    borderWidth: 1,
    width: 45,
    height: 45,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    width: 45,
    height: 55,
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
    bottom: -20,
    borderLeftWidth: 22.5,
    borderRightWidth: 22.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: 20,
    borderTopColor: 'black',
  },
  pointText: {
    fontSize: 22,
    position: 'absolute',
    height: 35,
    bottom: -55,
    textAlign: 'center',
    width: 100,
  },

  // detail
  detail: {
    height: 120,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  detailElem: {
    alignItems: 'center',
    width: 120,
  },
  detailElemTitle: {
    fontSize: 23,
    marginTop: 5,
    marginBottom: 20,
  },
  detailElemContent: {
    fontSize: 23,
    marginBottom: 12,
  },
  detailElemOption: {
    fontSize: 12,
  },
});

export default GradeStyle;
