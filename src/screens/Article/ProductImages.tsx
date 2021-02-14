import React from 'react';
import { Image } from 'react-native';
import styles from './ProductImages.style';

// TODO: will change afterwards
function ProductImages({ dummyArticle }: any): JSX.Element {
  return (
    <Image style={styles.image} source={{ uri: dummyArticle.product_url[0] }} />
  );
}
export default ProductImages;
