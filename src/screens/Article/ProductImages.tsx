import React from 'react';
import { Image, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';

import { ColorArticleStatus, StringArticleStatus } from '@/enums/articleStatus';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';
import { ImageDict } from '@/types/shared';

import styles from './ProductImages.style';

// TODO: @juimdpp
// - 백에서 썸네일 + 기타 사진을 어떻게 줄지에 따라서 변경여부 판단

interface IArticleChat {
  image_urls: ImageDict[] | undefined;
  orderStatus: IArticleStatus;
}

function ProductImages({ image_urls, orderStatus }: IArticleChat): JSX.Element {
  const dot = <View style={styles.dot} />;
  console.log('images:', orderStatus);
  const images =
    image_urls == undefined ? (
      <Image source={require('@/assets/images/no-image.png')} />
    ) : (
      image_urls
        .map((item, _) => {
          return (
            <Image
              key={_}
              style={styles.image}
              source={{ uri: item.img_url as string }}
            />
          );
        })
        .concat(
          <Image
            key={1}
            style={styles.image}
            source={{
              uri: 'https://user-images.githubusercontent.com/60267222/122652722-27921600-d17b-11eb-99d4-ca3ffccb858e.png' as string,
            }}
          />
        )
    );
  /*
    TODO: @juimdpp
    remove concat (added it just to show that it works)
*/
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
      {
        <View
          style={[
            styles.completeTextContainer,
            {
              backgroundColor: ColorArticleStatus[orderStatus.progress_status],
            },
          ]}
        >
          <Text style={styles.completeText}>
            {StringArticleStatus[orderStatus.progress_status]}
          </Text>
        </View>
      }
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
