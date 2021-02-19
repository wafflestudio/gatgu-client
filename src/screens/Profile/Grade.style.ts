import { StyleSheet } from 'react-native';

const GradeStyle = StyleSheet.create({
  // container
  container: {
    borderWidth: 1,
    borderColor: 'black',
    height: 267,
    padding: 20,
  },

  // header
  header: {
    height: 25,
    paddingLeft: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 10,
    color: 'gray',
  },
  graphBoxes: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  detailElemContent: {
    fontSize: 15,
    marginBottom: 12,
  },
  detailElemOption: {
    fontSize: 13,
  },
});

export default GradeStyle;
