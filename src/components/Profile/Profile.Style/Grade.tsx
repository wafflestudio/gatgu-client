import { StyleSheet } from 'react-native';

const gradeStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    height: 320,
    padding: 20,
  },
  header: {
    height: 25,
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 25,
  },
  graph: {
    backgroundColor: 'blue',
    height: 135,
    justifyContent: 'center',
  },
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
    marginTop: 15,
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

export default gradeStyle;
