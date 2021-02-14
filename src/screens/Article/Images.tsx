import React from 'react';
import { Image } from 'react-native';
import styles from './Images.style';

// TODO: will change afterwards
function Images({ dummyArticle }: any): JSX.Element {
  return (
    <Image style={styles.image} source={{ uri: dummyArticle.product_url[0] }} />
  );
}
export default Images;
