import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface GSpaceProps {
  w?: ViewStyle['width'];
  h?: ViewStyle['height'];
}

const GSpace: React.FC<GSpaceProps> = ({ w, h }) => {
  return <View style={{ marginLeft: w, marginTop: h }} />;
};

export default GSpace;
