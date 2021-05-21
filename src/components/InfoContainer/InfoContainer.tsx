import React, { ReactNode } from 'react';
import { View } from 'react-native';

import styles from './InfoContainer.style';

interface IInfoContainerProps {
  children: ReactNode;
}

function InfoContainer({ children }: IInfoContainerProps): JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

export default InfoContainer;
