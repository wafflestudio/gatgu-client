import React, { ReactNode } from 'react';
import { View } from 'react-native';

import InfoContainerStyle from './InfoContainer.style';
interface IInfoContainerProps {
  children: ReactNode;
}

function InfoContainer({ children }: IInfoContainerProps) {
  return <View style={InfoContainerStyle.container}>{children}</View>;
}

export default InfoContainer;
