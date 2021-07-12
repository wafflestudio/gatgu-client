import React from 'react';
import { Image } from 'react-native';

import styles from './HDRBackBtn.style';

function HDRBackBtn(): JSX.Element {
  return (
    <Image
      source={require('@/assets/images/BackIcon.png')}
      style={styles.image}
    />
  );
}

export default HDRBackBtn;
