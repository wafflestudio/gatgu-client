import { IArticleProps } from '@/types/article';
import React from 'react';
import { Image } from 'react-native';
import styles from './ProductImages.style';

function ProductImages({ thumbnail_url }: IArticleProps): JSX.Element {
  return <Image style={styles.image} source={{ uri: thumbnail_url }} />;
}
export default ProductImages;
