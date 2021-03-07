import { Dimensions } from 'react-native';

// mobile phone infomation object
// width, height, ... etc

export const mobile = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};
