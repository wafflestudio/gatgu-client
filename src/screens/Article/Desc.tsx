import { IArticleProps } from '@/types/article';
import { View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Desc.style';

function Desc({ description }: IArticleProps): JSX.Element {
  return (
    <View>
      <Text style={styles.descText}>{description}</Text>
    </View>
  );
}
export default Desc;
