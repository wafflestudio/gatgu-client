import { StyleSheet } from 'react-native';

const TitleStyle = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },

  label: {
    marginRight: 10,
    marginLeft: 10,
  },

  subContainer: {
    height: 60,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TitleStyle;
