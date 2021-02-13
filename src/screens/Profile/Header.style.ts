import { StyleSheet } from 'react-native';

const HeaderStyle = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: 2,
  },
  button: {
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  modalContainer: {
    height: 150,
    width: 200,
    position: 'absolute',
    zIndex: 9999,
    top: 80,
    right: 0,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalText: {
    height: 75,
    width: 200,
    paddingStart: 20,
    lineHeight: 75,
    fontSize: 20,
  },
});

export default HeaderStyle;
