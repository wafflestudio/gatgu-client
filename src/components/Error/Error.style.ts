import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const ErrorStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modal: {
    zIndex: 30,
  },
  backfilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.2,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 335,
    height: 225,
  },
  heading: {
    ...typo.bold_20,
  },
  description: {
    ...typo.bigInfo,
    color: palette.dark,
  },
  buttonClose: {
    borderRadius: 11,
    padding: 10,
    width: 145,
    height: 46,
    backgroundColor: palette.blue,
    marginTop: 30,
  },
  btnText: {
    ...typo.bigInfo,
    color: palette.white,
    textAlign: 'center',
  },
});

export default ErrorStyles;
