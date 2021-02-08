import { StyleSheet } from 'react-native';
import { flexCol, flexRow } from '@/styles/basic';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photo: {
    width: '100%',
    height: 250,
  },
  recruitHalfContainer: {
    borderWidth: 1,
    height: 60,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    marginTop: 10,
  },
  label: {
    marginRight: 10,
    marginLeft: 10,
  },
  subContainer: {
    height: 60,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bigContainer: {
    height: 175,
    borderWidth: 1,
    width: '100%',
  },
  text: {
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default styles;
