import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { palette } from '@/styles';
import { ImageDict } from '@/types/shared';

import styles from './ProductImages.style';

interface IArticleChat {
  image_urls: ImageDict[];
}

function ProductImages({ image_urls }: IArticleChat): JSX.Element {
  const dot = <View style={styles.dot} />;

  const renderImage = () => {
    if (image_urls.length === 0) {
      return <Image source={require('@/assets/images/no-image.png')} />;
    }

    return image_urls.map((item) => (
      <Image
        key={item.id}
        source={{ uri: item.img_url }}
        style={styles.image}
      />
    ));
  };

  return (
    <View>
      <Swiper
        style={styles.swiper}
        loop={false}
        activeDotColor={palette.white}
        dot={dot}
        paginationStyle={styles.pageStyle}
      >
        {renderImage()}
      </Swiper>
    </View>
  );
}
export default ProductImages;
