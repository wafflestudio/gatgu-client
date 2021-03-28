import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

import waStyles from '../WriteArticle.style';

const DescriptionStyle = StyleSheet.create({
  labelContainer: {
    height: 50,
  },
  label: {
    ...typo.bigTitle,
    marginLeft: 20,
  },

  modalView: {
    height: '50%',
    width: '100%',
    marginTop: 'auto',
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
  },

  scrollDayContainer: {
    width: '100%',
    alignItems: 'center',
  },

  dayContainer: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayTextSelected: {
    color: palette.blue,
  },
  dayTextNonSelected: {
    color: palette.gray,
  },
  selected: {
    borderColor: palette.borderBlue,
  },
  nonSelected: {
    borderColor: palette.gray,
  },
});

export default DescriptionStyle;
