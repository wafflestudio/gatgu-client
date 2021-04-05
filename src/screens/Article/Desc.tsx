import React from 'react';
import { Text } from 'react-native';

import { View } from 'native-base';

import { IArticleProps } from '@/types/article';

import styles from './Desc.style';

function Desc({ description }: IArticleProps): JSX.Element {
  return (
    <View>
      <Text style={styles.descText}>{description}</Text>
    </View>
  );
}
export default Desc;
