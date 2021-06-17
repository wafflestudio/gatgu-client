import React from 'react';
import { Text } from 'react-native';

import { View } from 'native-base';

import { IArticleProps } from '@/types/article';

import styles from './Desc.style';

function Desc({ description, product_url }: IArticleProps): JSX.Element {
  return (
    <View>
      <Text style={styles.descText}>{description}</Text>
      <View style={styles.linkBox}>
        <Text style={styles.descText}>{product_url}</Text>
      </View>
    </View>
  );
}
export default Desc;
