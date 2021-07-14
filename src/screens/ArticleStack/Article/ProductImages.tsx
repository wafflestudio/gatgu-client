import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

import { Image } from 'native-base';

import { ColorArticleStatus, StringArticleStatus } from '@/constants/article';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';
import { ImageDict } from '@/types/shared';

import styles from './ProductImages.style';

interface IArticleChat {
  image_urls: ImageDict[];
  articleStatus: IArticleStatus;
}

function ProductImages({
  image_urls,
  articleStatus,
}: IArticleChat): JSX.Element {
  const dot = <View style={styles.dot} />;

  const images =
    image_urls.length == 0 ? (
      <Image
        alt="article_img"
        h={283}
        source={require('@/assets/images/no-image.png')}
      />
    ) : (
      image_urls.map((item, idx) => (
        <Image
          key={idx}
          alt="article_img"
          h={283}
          style={styles.image}
          source={{ uri: item.img_url }}
          fallbackSource={require('@/assets/images/defaultThumnail.png')}
        />
      ))
    );

  return (
    <View>
      <View>
        <Swiper
          style={styles.swiper}
          loop={false}
          activeDotColor={palette.white}
          dot={dot}
          paginationStyle={styles.pageStyle}
        >
          {images}
        </Swiper>
      </View>
      {/* {
        <View
          style={[
            styles.completeTextContainer,
            {
              backgroundColor:
                ColorArticleStatus[articleStatus.progress_status],
            },
          ]}
        >
          <Text style={styles.completeText}>
            {StringArticleStatus[articleStatus.progress_status]}
          </Text>
        </View>
      } */}
      {/* {orderStatus.progress_status >= ArticleStatus && (
        <View style={styles.completeCover} />
      )} */}
      {/* {orderStatus.progress_status >= ArticleStatus && (
        <View style={styles.completeTextContainer}>
          <Text style={styles.completeText}>모집완료</Text>
        </View>
      )} */}
    </View>
  );
}
export default ProductImages;
