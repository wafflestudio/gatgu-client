import React from 'react';
import { Image, View, Text } from 'react-native';
import styles from './ProductImages.style';
import Swiper from 'react-native-swiper';
import { palette } from '@/styles';
import { Status } from '@/constants/Enum';

// TODO: @juimdpp
// - 백에서 썸네일 + 기타 사진을 어떻게 줄지에 따라서 변경여부 판단

interface IArticleChat {
  thumbnail_url: string;
  image_url: string[] | undefined;
  orderStatus: number;
}

function ProductImages({
  // thumbnail_url, // TODO: @juimdpp 백에서 이미지를 어떻게 줄지 몰라서 일단 보류
  image_url,
  orderStatus,
}: IArticleChat): JSX.Element {
  const dot = <View style={styles.dot} />;

  const images =
    image_url != undefined &&
    image_url?.map((url, _ind) => {
      return <Image key={_ind} style={styles.image} source={{ uri: url }} />;
    });

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
      {orderStatus >= Status.ORDER_COMPLETE && (
        <View style={styles.completeCover} />
      )}
      {orderStatus >= Status.ORDER_COMPLETE && (
        <View style={styles.completeTextContainer}>
          <Text style={styles.completeText}>모집완료</Text>
        </View>
      )}
    </View>
  );
}
export default ProductImages;
