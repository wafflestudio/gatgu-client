import { IArticleProps } from '@/types/article';
import { IChattingRoom } from '@/types/chat';
import React, { useEffect } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import styles from './ProductImages.style';
import Swiper from 'react-native-swiper';
import { palette, typo } from '@/styles';
import { ORDER_COMPLETE } from '@/constants/Enum';

// TODO:
// - 백에서 썸네일 + 기타 사진을 어떻게 줄지에 따라서 변경여부 판단

interface IArticleChat {
  thumbnail_url: string;
  image_url: string[] | undefined;
  orderStatus: number;
}

function ProductImages({
  thumbnail_url, // 백에서 이미지를 어떻게 줄지 몰라서 일단 보류
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
      {orderStatus >= ORDER_COMPLETE && <View style={styles.completeCover} />}
      {orderStatus >= ORDER_COMPLETE && (
        <View style={styles.completeTextContainer}>
          <Text style={styles.completeText}>모집완료</Text>
        </View>
      )}
    </View>
  );
}
export default ProductImages;
