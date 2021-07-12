import { StyleSheet } from 'react-native';

import { palette, typo } from '@/styles';

const DescriptionStyle = StyleSheet.create({
  labelContainer: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    ...typo.bigTitle,
    marginLeft: 20,
  },
  timeContainer: {
    flexDirection: 'row',
  },

  modalView: {
    height: '45%',
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

  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  completeButton: {
    justifyContent: 'flex-end',
    borderWidth: 1,
    padding: 5,
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16,
    backgroundColor: palette.blue,
  },

  buttonText: {
    color: palette.white,
    ...typo.button,
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
    backgroundColor: palette.whiteGray,
  },
});

export default DescriptionStyle;
