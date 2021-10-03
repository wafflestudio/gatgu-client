import React from 'react';
import { Linking } from 'react-native';

import { Text, View } from 'native-base';

import { typo } from '@/styles';
import { IArticleProps } from '@/types/article';

import styles from './Desc.style';

type TDescProps = Pick<IArticleProps, 'description' | 'product_url'>;

function Desc({ description, product_url }: TDescProps): JSX.Element {
  const loadInBrowser = () => {
    Linking.openURL(product_url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View>
      <Text style={styles.descText}>{description}</Text>
      <View style={styles.linkBox}>
        <Text style={typo.semiTitle} underline onPress={loadInBrowser}>
          {product_url}
        </Text>
      </View>
    </View>
  );
}
export default Desc;
